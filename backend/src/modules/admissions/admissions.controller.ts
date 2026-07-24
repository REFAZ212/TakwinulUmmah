import { Body, Controller, Get, Patch, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AdmissionsService } from './admissions.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { AdmissionStatus } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

/** PUBLIC — the registration form on /admissions posts here, no auth. */
@Controller('public/admissions')
export class AdmissionsPublicController {
  constructor(private service: AdmissionsService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60_000 } }) // spam mitigation on public form
  submit(@Body() dto: CreateAdmissionDto) {
    return this.service.create(dto);
  }
}

/** ADMIN — panitia PPDB manages submissions here. */
@Controller('admin/admissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdmissionsAdminController {
  constructor(private service: AdmissionsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA')
  findAll(@Query('status') status?: AdmissionStatus) {
    return this.service.findAll(status);
  }

  @Patch(':id/status')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA')
  updateStatus(@Param('id') id: string, @Body('status') status: AdmissionStatus) {
    return this.service.updateStatus(id, status);
  }
}
