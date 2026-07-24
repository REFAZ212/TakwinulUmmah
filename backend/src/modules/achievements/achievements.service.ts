import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AchievementUnit, AchievementLevel } from '@prisma/client';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  findAll(unit?: AchievementUnit, level?: AchievementLevel) {
    return this.prisma.achievement.findMany({
      where: { ...(unit ? { unit } : {}), ...(level ? { level } : {}) },
      orderBy: { year: 'desc' },
      include: { photo: true },
    });
  }

  findAllAdmin() {
    return this.prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateAchievementDto) {
    return this.prisma.achievement.create({ data: dto });
  }

  async update(id: string, dto: UpdateAchievementDto) {
    await this.ensureExists(id);
    return this.prisma.achievement.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.achievement.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.achievement.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Prestasi tidak ditemukan.');
  }
}
