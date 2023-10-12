import { IsEmail, IsOptional, IsPositive } from 'class-validator';

export class UserUpdateDto {
  @IsPositive()
  id: number;

  @IsEmail()
  email: string;

  @IsOptional()
  /** prénom */
  firstname?: string;

  @IsOptional()
  /** nom */
  lastname?: string;
}
