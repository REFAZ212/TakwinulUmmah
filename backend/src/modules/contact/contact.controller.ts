import { Body, Controller, Get, Patch, Param, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public/contact')
export class ContactPublicController {
  constructor(private service: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  submit(@Body() dto: CreateContactDto) {
    return this.service.create(dto);
  }
}

@Controller('admin/contact')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN_YAYASAN')
export class ContactAdminController {
  constructor(private service: ContactService) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.service.markRead(id);
  }
}
