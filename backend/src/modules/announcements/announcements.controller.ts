import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementCategory } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/announcements')
export class AnnouncementsPublicController {
  constructor(private service: AnnouncementsService) {}

  @Get()
  list(@Query('category') category?: AnnouncementCategory) {
    return this.service.findPublished(category);
  }
}

@Controller('admin/announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class AnnouncementsAdminController {
  constructor(private service: AnnouncementsService) {}

  @Get()
  list() {
    return this.service.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateAnnouncementDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
