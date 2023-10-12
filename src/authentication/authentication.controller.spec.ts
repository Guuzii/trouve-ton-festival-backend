import { Test, TestingModule } from '@nestjs/testing';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserGetDto } from 'src/user/dto/out/user-get.dto';
import { RegisterDto } from './dto/in/register.dto';
import { LoginDto } from './dto/in/login.dto';
import { AccessTokenDto } from './dto/out/access-token.dto';

const accessToken: AccessTokenDto = {
  accessToken: 'test_token_123',
};

describe('AuthenticationController', () => {
  let authController: AuthenticationController;
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            register: jest.fn().mockImplementation((dto: RegisterDto) => {
              return Promise.resolve<UserGetDto>({
                id: 1,
                email: dto.email,
                firstname: 'jean',
                lastname: 'dupont',
              });
            }),
            login: jest.fn().mockResolvedValue(accessToken),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthenticationController>(
      AuthenticationController,
    );
    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should return the newly created user as UserDtoGet', async () => {
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

      expect(
        await authController.signUp(registerDto),
      ).toStrictEqual<UserGetDto>(userDto);
    });
  });

  describe('signIn', () => {
    it('should return an access token as AccessTokenDto', async () => {
      const loginDto: LoginDto = {
        email: 'foo@bar.com',
        password: 'foobar1234',
      };

      expect(await authController.signIn(loginDto)).toBe<AccessTokenDto>(
        accessToken,
      );
    });
  });
});
