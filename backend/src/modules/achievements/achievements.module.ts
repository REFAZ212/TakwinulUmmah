import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsPublicController, AchievementsAdminController } from './achievements.controller';

@Module({
  controllers: [AchievementsPublicController, AchievementsAdminController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
