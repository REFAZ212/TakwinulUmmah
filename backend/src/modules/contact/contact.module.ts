import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactPublicController, ContactAdminController } from './contact.controller';

@Module({
  controllers: [ContactPublicController, ContactAdminController],
  providers: [ContactService],
})
export class ContactModule {}
