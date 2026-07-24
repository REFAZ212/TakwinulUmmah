import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString()
  siteName?: string;

  @IsOptional() @IsString()
  themeColor?: string;

  @IsOptional() @IsString()
  googleMapsEmbed?: string;

  @IsOptional()
  socialLinks?: Record<string, string>;
}
