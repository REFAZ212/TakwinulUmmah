import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString() @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString() @IsNotEmpty()
  subject: string;

  @IsString() @MinLength(10)
  message: string;
}
