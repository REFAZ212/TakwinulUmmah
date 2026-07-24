import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/downloads')
export class DownloadsPublicController {
  constructor(private service: DownloadsService) {}

  @Get()
  list() {
    return this.service.findAll();
  }
}

@Controller('admin/downloads')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class DownloadsAdminController {
  constructor(private service: DownloadsService) {}

  @Get()
  findAll() {
    return this.service.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateDownloadDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDownloadDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
