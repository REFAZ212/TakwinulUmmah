import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    // Constant-shape error to avoid leaking which part (email/password) was wrong
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Email atau kata sandi salah.');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Email atau kata sandi salah.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    });

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await this.prisma.activityLog.create({
      data: { userId: user.id, action: 'LOGIN', entity: 'User', entityId: user.id },
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role.name },
    };
  }

  async refresh(token: string) {
    let payload: { sub: string; email: string; role: string };
    try {
      payload = this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
    } catch {
      throw new UnauthorizedException('Refresh token tidak valid atau kedaluwarsa.');
    }

    const stored = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token tidak valid atau telah dicabut.');
    }

    const accessToken = this.jwtService.sign(
      { sub: payload.sub, email: payload.email, role: payload.role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m' },
    );

    return { accessToken };
  }

  async logout(token: string) {
    await this.prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
    return { message: 'Berhasil keluar.' };
  }
}
