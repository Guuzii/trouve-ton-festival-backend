import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { RegisterDto } from './dto/in/register.dto';
import { LoginDto } from './dto/in/login.dto';
import { UserService } from '../user/user.service';
import { UserGetDto } from '../user/dto/out/user-get.dto';
import { AccessTokenDto } from './dto/out/access-token.dto';
import { JwtPayloadDto } from './dto/protected/jwt-payload-auth.dto';
import { UserAuthDto } from '../user/dto/protected/user-auth.dto';
import { ResetPwdDto } from './dto/in/reset-password.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserGetDto> {
    if (await this.userService.getByEmail(registerDto.email)) {
      throw new ConflictException('Email already in use');
    }
    registerDto.password = await bcrypt.hash(
      registerDto.password,
      await bcrypt.genSalt(10),
    );

    return await this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto): Promise<AccessTokenDto> {
    const foundUser: UserAuthDto | null =
      await this.userService.getHashedPwdFromEmail(loginDto.email);
    if (
      !foundUser ||
      !(await bcrypt.compare(loginDto.password, foundUser.password))
    )
      throw new UnauthorizedException('Wrong email or password');

    const payload: JwtPayloadDto = {
      userId: foundUser.id,
      userEmail: foundUser.email,
    };
    const response: AccessTokenDto = {
      accessToken: await this.generateJWT(payload),
    };

    return response;
  }

  async sendForgotPwdEmail(
    userEmail: string,
    host: string,
    controller: string,
  ): Promise<void> {
    const user: UserGetDto | null =
      await this.userService.getByEmail(userEmail);
    if (user) {
      const payload: JwtPayloadDto = { userId: user.id, userEmail: user.email };
      const resetJWT: string = await this.generateJWT(payload, false);

      if (await this.userService.updatePasswordToken(user.id, resetJWT)) {
        this.mailService.sendResetPassword(
          userEmail,
          resetJWT,
          host,
          controller,
        );
      }
    }
  }

  async resetPassword(resetPwdDto: ResetPwdDto): Promise<void> {
    let payload: JwtPayloadDto;

    try {
      payload = await this.jwtService.verifyAsync(resetPwdDto.token, {
        secret: process.env.JWT_SECRET_PWD_RESET,
      });
    } catch {
      throw new UnauthorizedException('reset token is invalid');
    }

    const updatedUser: UserAuthDto = {
      id: payload.userId,
      email: payload.userEmail,
      password: await bcrypt.hash(
        resetPwdDto.password,
        await bcrypt.genSalt(10),
      ),
    };
    await this.userService.updatePassword(updatedUser, resetPwdDto.token);
  }

  private async generateJWT(
    payload: JwtPayloadDto,
    isAuth: boolean = true,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: isAuth
        ? process.env.JWT_SECRET_AUTH
        : process.env.JWT_SECRET_PWD_RESET,
      expiresIn: isAuth
        ? process.env.JWT_EXPIRE_AUTH
        : process.env.JWT_EXPIRE_PWD_RESET,
    });
  }
}
