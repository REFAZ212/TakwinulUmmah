import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DownloadCategory } from '@prisma/client';

export class CreateDownloadDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsEnum(DownloadCategory)
  category: DownloadCategory;

  @IsString() @IsNotEmpty()
  fileUrl: string;

  @IsString() @IsNotEmpty()
  fileType: string;

  @IsOptional() @IsString()
  fileSize?: string;
}
