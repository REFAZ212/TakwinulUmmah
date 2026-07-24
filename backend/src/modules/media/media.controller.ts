import {
  Controller, Get, Post, UseGuards, UseInterceptors, UploadedFile, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

// Media Manager — admin only. The public site only ever reads Media rows
// indirectly through other public endpoints (news.thumbnail, gallery, etc).
@Controller('admin/media')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class MediaAdminController {
  constructor(private service: MediaService) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } })) // 10MB cap
  upload(@UploadedFile() file: Express.Multer.File, @Body('altText') altText?: string) {
    return this.service.saveUpload(file, altText);
  }
}
