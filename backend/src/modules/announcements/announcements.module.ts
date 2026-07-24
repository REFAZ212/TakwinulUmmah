import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsPublicController, AnnouncementsAdminController } from './announcements.controller';

@Module({
  controllers: [AnnouncementsPublicController, AnnouncementsAdminController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
