import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsPublicController, SettingsAdminController } from './settings.controller';

@Module({
  controllers: [SettingsPublicController, SettingsAdminController],
  providers: [SettingsService],
})
export class SettingsModule {}
