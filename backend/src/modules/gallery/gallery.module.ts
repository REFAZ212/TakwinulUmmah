import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryPublicController, GalleryAdminController } from './gallery.controller';

@Module({
  controllers: [GalleryPublicController, GalleryAdminController],
  providers: [GalleryService],
})
export class GalleryModule {}
