import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { RegisterDto } from '../authentication/dto/in/register.dto';
import { UserGetDto } from './dto/out/user-get.dto';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserEntity,
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<Repository<UserEntity>>(UserEntity);
    userService = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should return an array of UserGetDto', async () => {
      const entities: UserEntity[] = await userRepository.find();
      const results: UserGetDto[] = [];

      entities.forEach(async (userEntity: UserEntity) => {
        results.push(
          (await UserMapper.entityToDtoGet(userEntity)) as UserGetDto,
        );
      });
      expect(await userService.getAll()).toBe<UserGetDto[]>(results);
    });
  });

  describe('getById', () => {
    it('should return the UserGetDto with specified id', async () => {
      expect(await userService.getById(1)).toBe<UserGetDto | null>(
        await UserMapper.entityToDtoGet(
          await userRepository.findOneBy({ id: 1 }),
        ),
      );
    });
  });

  describe('getByEmail', () => {
    it('should return the UserGetDto with specified email', async () => {
      expect(
        await userService.getByEmail('foo1@bar.fr'),
      ).toBe<UserGetDto | null>(
        await UserMapper.entityToDtoGet(
          await userRepository.findOneBy({ email: 'foo1@bar.fr' }),
        ),
      );
    });
  });

  describe('create', () => {
    it('should return the created UserGetDto', async () => {
      const registerDto: RegisterDto = {
        email: 'foo@bar.org',
        password: 'foobar',
      };
      expect(await userService.create(registerDto)).toBe<UserGetDto>({
        id: 1,
        firstname: '',
        lastname: '',
        ...registerDto,
      } as UserGetDto);
    });
  });
});
