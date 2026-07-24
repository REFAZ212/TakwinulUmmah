import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ContentStatus, NewsCategory } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  // ---------- PUBLIC ----------
  findPublished(params: { category?: NewsCategory; page?: number; pageSize?: number }) {
    const { category, page = 1, pageSize = 9 } = params;
    return this.prisma.news.findMany({
      where: { status: ContentStatus.PUBLISHED, ...(category ? { category } : {}) },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { thumbnail: true, author: { select: { name: true } } },
    });
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
      include: { thumbnail: true, galleryImages: true, author: { select: { name: true } }, seo: true },
    });
    if (!news || news.status !== ContentStatus.PUBLISHED) {
      throw new NotFoundException('Berita tidak ditemukan.');
    }
    return news;
  }

  // ---------- ADMIN ----------
  findAllAdmin(params: { page?: number; pageSize?: number }) {
    const { page = 1, pageSize = 20 } = params;
    return this.prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { thumbnail: true, author: { select: { name: true } } },
    });
  }

  create(dto: CreateNewsDto, authorId: string) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.news.create({
      data: {
        ...dto,
        slug,
        authorId,
        publishedAt: dto.status === ContentStatus.PUBLISHED ? new Date() : null,
      },
    });
  }

  async update(id: string, dto: UpdateNewsDto) {
    await this.ensureExists(id);
    return this.prisma.news.update({
      where: { id },
      data: {
        ...dto,
        publishedAt: dto.status === ContentStatus.PUBLISHED ? new Date() : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.news.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.news.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Berita tidak ditemukan.');
  }
}
