import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaAdminController } from './media.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [MediaAdminController],
  providers: [MediaService, CloudinaryProvider],
})
export class MediaModule {}
