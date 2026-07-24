import { Module } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionsPublicController, AdmissionsAdminController } from './admissions.controller';

@Module({
  controllers: [AdmissionsPublicController, AdmissionsAdminController],
  providers: [AdmissionsService],
})
export class AdmissionsModule {}
