import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let jwtService: JwtService;
  let reflector: Reflector;
  let authGuard: AuthenticationGuard;

  beforeEach(() => {
    jwtService = new JwtService();
    reflector = new Reflector();
    authGuard = new AuthenticationGuard(jwtService, reflector);
  });

  it('should be defined', () => {
    expect(process.env.JWT_SECRET_AUTH).toBeDefined();
    expect(process.env.JWT_EXPIRE_AUTH).toBeDefined();
    expect(authGuard).toBeDefined();
  });

  it('should return true with access token', async () => {
    const token: string = await jwtService.signAsync(
      { sub: 1, username: 'foo@bar.com' },
      {
        secret: process.env.JWT_SECRET_AUTH,
        expiresIn: process.env.JWT_EXPIRE_AUTH,
      },
    );

    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'Bearer ' + token,
      },
    });

    expect(authGuard.canActivate(context)).toBeTruthy();
  });

  // TODO: find a way to test UnauthorizedException
  // it('should return UnauthorizedException without access token', async () => {
  //   const context = createMock<ExecutionContext>();
  //   const errorGuard = () => authGuard.canActivate(context);

  //   expect(errorGuard).toThrowError(UnauthorizedException);
  //   expect(context.switchToHttp).toBeCalledTimes(1);
  // });
});
