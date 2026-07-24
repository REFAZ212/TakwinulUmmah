import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  description: string;

  @IsString() @IsNotEmpty()
  location: string;

  @IsOptional() @IsString()
  photoMediaId?: string;

  @IsOptional() @IsString()
  pesantrenId?: string;

  @IsOptional() @IsString()
  smpId?: string;

  @IsOptional() @IsString()
  smaId?: string;
}
