import { IsEmail } from 'class-validator';

export class StringEmailDto {
  @IsEmail()
  email: string;
}
