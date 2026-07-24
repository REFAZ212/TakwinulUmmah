import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.facility.findMany({ include: { photo: true }, orderBy: { createdAt: 'desc' } });
  }

  findAllAdmin() {
    return this.prisma.facility.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateFacilityDto) {
    return this.prisma.facility.create({ data: dto });
  }

  async update(id: string, dto: UpdateFacilityDto) {
    const exists = await this.prisma.facility.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Fasilitas tidak ditemukan.');
    return this.prisma.facility.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.facility.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Fasilitas tidak ditemukan.');
    return this.prisma.facility.delete({ where: { id } });
  }
}
