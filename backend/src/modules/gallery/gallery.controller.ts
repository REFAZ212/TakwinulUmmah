import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { GalleryCategory } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/gallery')
export class GalleryPublicController {
  constructor(private service: GalleryService) {}

  @Get()
  list(@Query('category') category?: GalleryCategory) {
    return this.service.findAll(category);
  }
}

@Controller('admin/gallery')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class GalleryAdminController {
  constructor(private service: GalleryService) {}

  @Get()
  findAll() {
    return this.service.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
