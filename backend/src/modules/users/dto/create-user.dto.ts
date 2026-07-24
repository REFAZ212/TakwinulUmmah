import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RoleName } from '@prisma/client';

export class CreateUserDto {
  @IsString() @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString() @MinLength(8)
  password: string;

  @IsEnum(RoleName)
  role: RoleName;
}
