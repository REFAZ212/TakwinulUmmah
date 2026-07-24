import { Inject, Injectable } from '@nestjs/common';
import { v2 as CloudinaryType } from 'cloudinary';
import { PrismaService } from '../../prisma/prisma.service';
import { CLOUDINARY_PROVIDER } from './cloudinary.provider';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    @Inject(CLOUDINARY_PROVIDER) private cloudinary: typeof CloudinaryType,
  ) {}

  findAll() {
    return this.prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
  }

  /**
   * Uploads to Cloudinary when CLOUDINARY_CLOUD_NAME is configured, otherwise
   * falls back to storing the already-saved local file path under /uploads
   * (see main.ts static assets + Multer diskStorage in a real controller).
   */
  async saveUpload(file: Express.Multer.File, altText?: string) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = this.cloudinary.uploader.upload_stream(
          { folder: 'takwinul-ummah' },
          (error, res) => (error ? reject(error) : resolve(res)),
        );
        stream.end(file.buffer);
      });
      return this.prisma.media.create({
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          altText,
          mimeType: file.mimetype,
          width: result.width,
          height: result.height,
        },
      });
    }

    // Local fallback (dev only)
    const ext = file.mimetype.split('/')[1] || 'bin';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const fs = await import('fs/promises');
    const path = await import('path');
    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), file.buffer);
    return this.prisma.media.create({
      data: { url: `/uploads/${filename}`, altText, mimeType: file.mimetype },
    });
  }
}
