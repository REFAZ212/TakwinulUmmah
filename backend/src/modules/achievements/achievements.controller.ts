import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AchievementUnit, AchievementLevel } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/achievements')
export class AchievementsPublicController {
  constructor(private service: AchievementsService) {}

  @Get()
  list(@Query('unit') unit?: AchievementUnit, @Query('level') level?: AchievementLevel) {
    return this.service.findAll(unit, level);
  }
}

@Controller('admin/achievements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR')
export class AchievementsAdminController {
  constructor(private service: AchievementsService) {}

  @Get()
  findAll() {
    return this.service.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateAchievementDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAchievementDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
