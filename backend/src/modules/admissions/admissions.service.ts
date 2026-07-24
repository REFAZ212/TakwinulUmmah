import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { AdmissionStatus } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(private prisma: PrismaService) {}

  // ---------- PUBLIC ----------
  create(dto: CreateAdmissionDto) {
    return this.prisma.admission.create({ data: dto });
  }

  // ---------- ADMIN ----------
  findAll(status?: AdmissionStatus) {
    return this.prisma.admission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: AdmissionStatus) {
    const exists = await this.prisma.admission.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Data pendaftaran tidak ditemukan.');
    return this.prisma.admission.update({ where: { id }, data: { status } });
  }
}
