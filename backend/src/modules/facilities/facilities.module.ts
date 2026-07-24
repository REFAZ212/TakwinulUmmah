import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesPublicController, FacilitiesAdminController } from './facilities.controller';

@Module({
  controllers: [FacilitiesPublicController, FacilitiesAdminController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
