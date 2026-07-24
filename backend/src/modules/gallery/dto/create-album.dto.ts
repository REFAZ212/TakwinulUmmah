import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GalleryCategory } from '@prisma/client';

export class CreateAlbumDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsEnum(GalleryCategory)
  category: GalleryCategory;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @IsString()
  coverId?: string;

  @IsOptional() @IsString({ each: true })
  photoIds?: string[];
}
