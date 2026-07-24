import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsCategory } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

/**
 * PUBLIC surface — anyone can read published news, no auth required.
 * Mounted at /api/public/news
 */
@Controller('public/news')
export class NewsPublicController {
  constructor(private newsService: NewsService) {}

  @Get()
  list(
    @Query('category') category?: NewsCategory,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.newsService.findPublished({
      category,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }
}

/**
 * ADMIN surface — every route requires a valid JWT + permitted role.
 * Mounted at /api/admin/news
 */
@Controller('admin/news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsAdminController {
  constructor(private newsService: NewsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
  list(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.newsService.findAllAdmin({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
  create(@Body() dto: CreateNewsDto, @CurrentUser() user: { id: string }) {
    return this.newsService.create(dto, user.id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
