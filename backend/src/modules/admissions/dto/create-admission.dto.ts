import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { AdmissionUnit } from '@prisma/client';

export class CreateAdmissionDto {
  @IsString() @MinLength(3)
  fullName: string;

  @IsEnum(AdmissionUnit)
  unit: AdmissionUnit;

  @IsString() @MinLength(3)
  parentName: string;

  @IsString() @MinLength(9)
  phone: string;

  @IsEmail()
  email: string;

  @IsString() @MinLength(10)
  address: string;

  @IsString() @IsNotEmpty()
  previousSchool: string;

  @IsOptional() @IsString()
  message?: string;
}
