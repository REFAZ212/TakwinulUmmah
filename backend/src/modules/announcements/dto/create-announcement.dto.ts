import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { AnnouncementCategory, ContentStatus } from '@prisma/client';

export class CreateAnnouncementDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsEnum(AnnouncementCategory)
  category: AnnouncementCategory;

  @IsString() @IsNotEmpty()
  content: string;

  @IsOptional() @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional() @IsDateString()
  scheduledAt?: string; // ISO date — supports "schedule publish"
}
