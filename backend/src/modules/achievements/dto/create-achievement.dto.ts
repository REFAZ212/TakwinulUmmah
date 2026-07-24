import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { AchievementType, AchievementUnit, AchievementLevel } from '@prisma/client';

export class CreateAchievementDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsEnum(AchievementType)
  type: AchievementType;

  @IsEnum(AchievementUnit)
  unit: AchievementUnit;

  @IsEnum(AchievementLevel)
  level: AchievementLevel;

  @IsString() @IsNotEmpty()
  winner: string;

  @IsInt() @Min(1990) @Max(2100)
  year: number;

  @IsString() @IsNotEmpty()
  description: string;

  @IsOptional() @IsString()
  photoMediaId?: string;
}
