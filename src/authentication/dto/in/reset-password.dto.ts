import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPwdDto {
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  token: string;
}
