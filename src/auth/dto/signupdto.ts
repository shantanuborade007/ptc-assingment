import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class SignupDto {


  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  tenetId: string;

  @IsString()
  clientId?: string; // Optional

  @IsString()
  audience?: string; // Optional

  @IsString()
  appId?: string; // Optional
}
