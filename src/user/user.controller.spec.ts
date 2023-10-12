import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserGetDto } from './dto/out/user-get.dto';

const userArray: UserGetDto[] = [
  {
    id: 1,
    email: 'foo1@bar.com',
    firstname: 'jean',
    lastname: 'dupont',
  },
  {
    id: 2,
    email: 'foo2@bar.com',
    firstname: 'jean',
    lastname: 'dupont',
  },
  {
    id: 3,
    email: 'foo3@bar.com',
    firstname: 'jean',
    lastname: 'dupont',
  },
];

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(userArray),
            getById: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve(
                userArray.find((userDto: UserGetDto) => userDto.id === id) ??
                  null,
              );
            }),
            getByEmail: jest.fn().mockImplementation((email: string) => {
              return Promise.resolve(
                userArray.find(
                  (userDto: UserGetDto) => userDto.email === email,
                ) ?? null,
              );
            }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('getAll', () => {
    it('should return an array of UserGetDto', async () => {
      expect(await userController.findAll()).toBe<UserGetDto[]>(userArray);
    });
  });

  describe('getById', () => {
    it('should return the UserGetDto with specified id', async () => {
      const result: UserGetDto = {
        id: 1,
        email: 'foo1@bar.com',
        firstname: 'jean',
        lastname: 'dupont',
      };
      expect(await userController.findById(1)).toStrictEqual<UserGetDto>(
        result,
      );
    });
    it('should return null if not found', async () => {
      expect(await userController.findById(4)).toBe<null>(null);
    });
  });

  describe('getByEmail', () => {
    it('should return the UserGetDto with specified email', async () => {
      const result: UserGetDto = {
        id: 2,
        email: 'foo2@bar.com',
        firstname: 'jean',
        lastname: 'dupont',
      };
      expect(
        await userController.findByEmail({ email: 'foo2@bar.com' }),
      ).toStrictEqual<UserGetDto>(result);
    });
    it('should return null if not found', async () => {
      expect(
        await userController.findByEmail({ email: 'test@test.com' }),
      ).toBe<null>(null);
    });
  });
});
