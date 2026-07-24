import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  // ---------- PUBLIC ----------
  // Exposes only what the public site needs (nav, contact, socials) —
  // never anything internal to the admin panel.
  async getPublic() {
    const foundation = await this.prisma.foundation.findFirst({
      include: { settings: true, logo: true },
    });
    if (!foundation) return null;
    return {
      siteName: foundation.settings?.siteName ?? foundation.shortName,
      address: foundation.address,
      phone: foundation.phone,
      whatsapp: foundation.whatsapp,
      email: foundation.email,
      logoUrl: foundation.logo?.url,
      themeColor: foundation.settings?.themeColor,
      googleMapsEmbed: foundation.settings?.googleMapsEmbed,
      socialLinks: foundation.settings?.socialLinks,
    };
  }

  // ---------- ADMIN ----------
  async update(dto: UpdateSettingsDto) {
    const foundation = await this.prisma.foundation.findFirst();
    if (!foundation) throw new Error('Data yayasan belum diinisialisasi. Jalankan seed terlebih dahulu.');
    return this.prisma.setting.upsert({
      where: { foundationId: foundation.id },
      update: dto,
      create: { foundationId: foundation.id, siteName: dto.siteName ?? foundation.shortName, ...dto },
    });
  }
}
