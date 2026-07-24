import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/facilities')
export class FacilitiesPublicController {
  constructor(private service: FacilitiesService) {}

  @Get()
  list() {
    return this.service.findAll();
  }
}

@Controller('admin/facilities')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class FacilitiesAdminController {
  constructor(private service: FacilitiesService) {}

  @Get()
  findAll() {
    return this.service.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateFacilityDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacilityDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
