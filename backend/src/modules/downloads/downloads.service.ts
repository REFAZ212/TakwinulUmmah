import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';

@Injectable()
export class DownloadsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.downloadFile.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findAllAdmin() {
    return this.prisma.downloadFile.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateDownloadDto) {
    return this.prisma.downloadFile.create({ data: dto });
  }

  async update(id: string, dto: UpdateDownloadDto) {
    const exists = await this.prisma.downloadFile.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Berkas tidak ditemukan.');
    return this.prisma.downloadFile.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.downloadFile.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Berkas tidak ditemukan.');
    return this.prisma.downloadFile.delete({ where: { id } });
  }
}
