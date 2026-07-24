import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementCategory, ContentStatus } from '@prisma/client';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  // ---------- PUBLIC ----------
  // Only shows PUBLISHED announcements whose scheduledAt (if any) has passed.
  findPublished(category?: AnnouncementCategory) {
    return this.prisma.announcement.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [{ scheduledAt: null }, { scheduledAt: { lte: new Date() } }],
        ...(category ? { category } : {}),
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  // ---------- ADMIN ----------
  findAllAdmin() {
    return this.prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        ...dto,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        publishedAt: dto.status === ContentStatus.PUBLISHED && !dto.scheduledAt ? new Date() : null,
      },
    });
  }

  async update(id: string, dto: UpdateAnnouncementDto) {
    await this.ensureExists(id);
    return this.prisma.announcement.update({
      where: { id },
      data: {
        ...dto,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        publishedAt: dto.status === ContentStatus.PUBLISHED ? new Date() : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.announcement.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.announcement.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Pengumuman tidak ditemukan.');
  }
}
