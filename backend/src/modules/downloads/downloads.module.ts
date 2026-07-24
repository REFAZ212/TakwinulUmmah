import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsPublicController, DownloadsAdminController } from './downloads.controller';

@Module({
  controllers: [DownloadsPublicController, DownloadsAdminController],
  providers: [DownloadsService],
})
export class DownloadsModule {}
