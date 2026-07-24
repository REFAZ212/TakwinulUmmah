import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { GalleryCategory } from '@prisma/client';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: GalleryCategory) {
    return this.prisma.album.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { cover: true, photos: true },
    });
  }

  findAllAdmin() {
    return this.prisma.album.findMany({
      orderBy: { createdAt: 'desc' },
      include: { photos: true, cover: true },
    });
  }

  create(dto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: {
        title: dto.title,
        category: dto.category,
        description: dto.description,
        coverId: dto.coverId,
        photos: dto.photoIds ? { connect: dto.photoIds.map((id) => ({ id })) } : undefined,
      },
    });
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const exists = await this.prisma.album.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Album tidak ditemukan.');
    return this.prisma.album.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.coverId !== undefined && { coverId: dto.coverId }),
        ...(dto.photoIds !== undefined && {
          photos: { set: dto.photoIds.map((pid) => ({ id: pid })) },
        }),
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.album.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Album tidak ditemukan.');
    return this.prisma.album.delete({ where: { id } });
  }
}
