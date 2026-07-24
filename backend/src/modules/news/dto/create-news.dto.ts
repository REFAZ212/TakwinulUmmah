import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NewsCategory, ContentStatus } from '@prisma/client';

export class CreateNewsDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsEnum(NewsCategory)
  category: NewsCategory;

  @IsString() @IsNotEmpty()
  content: string;

  @IsOptional() @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional() @IsString()
  thumbnailId?: string;
}
