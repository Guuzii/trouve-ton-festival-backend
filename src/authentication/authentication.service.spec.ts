import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/in/register.dto';
import { UserGetDto } from '../user/dto/out/user-get.dto';
import { UserAuthDto } from '../user/dto/protected/user-auth.dto';
import { LoginDto } from './dto/in/login.dto';
import { AccessTokenDto } from './dto/out/access-token.dto';

const userAuthDto: UserAuthDto = {
  id: 1,
  email: 'foo@bar.com',
  password: 'foobar1234',
};

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockImplementation((dto: RegisterDto) => {
              return Promise.resolve<UserGetDto>({
                id: 1,
                email: dto.email,
                firstname: 'jean',
                lastname: 'dupont',
              });
            }),
            getHashedPwdFromEmail: jest.fn().mockResolvedValue(userAuthDto),
          },
        },
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(process.env.JWT_SECRET_AUTH).toBeDefined();
    expect(process.env.JWT_EXPIRE_AUTH).toBeDefined();
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('register', () => {
    it('should return created user as UserGetDto', async () => {
      const registerDto: RegisterDto = {
        email: 'foo@bar.com',
        password: 'foobar1234',
      };
      const userDto: UserGetDto = {
        id: 1,
        email: registerDto.email,
        firstname: 'jean',
        lastname: 'dupont',
      };
      expect(await authService.register(registerDto)).toStrictEqual(userDto);
    });
  });

  describe('login', () => {
    it('should return an access token as AccessTokenDto', async () => {
      const loginDto: LoginDto = {
        email: 'foo@bar.com',
        password: 'foobar1234',
      };

      const payload = { sub: userAuthDto.id, username: userAuthDto.email };
      const result: AccessTokenDto = {
        accessToken: await jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_AUTH,
          expiresIn: process.env.JWT_EXPIRE_AUTH,
        }),
      };

      expect(await authService.login(loginDto)).toStrictEqual(result);
    });
  });
});
