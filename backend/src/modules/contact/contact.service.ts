import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  // ---------- PUBLIC ----------
  create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  // ---------- ADMIN ----------
  findAll() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async markRead(id: string) {
    const exists = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Pesan tidak ditemukan.');
    return this.prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  }
}
