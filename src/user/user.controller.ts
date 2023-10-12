import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { UserGetDto } from './dto/out/user-get.dto';
import { StringEmailDto } from '../common/dto/string-email.dto';
import { UserUpdateDto } from './dto/in/user-update.dto';
import { multerImgOpt } from '../common/constant/multer-opt.const';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    description: 'A list of all users',
    type: [UserGetDto],
  })
  @Get('all')
  async findAll(): Promise<UserGetDto[]> {
    return await this.userService.getAll();
  }

  @ApiResponse({
    description: 'The user with specified id',
    type: UserGetDto,
  })
  @Get('/byId/:id')
  async findById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserGetDto | null> {
    return await this.userService.getById(userId);
  }

  @ApiResponse({
    description: 'The user with specified email',
    type: UserGetDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/byEmail')
  async findByEmail(
    @Body() stringEmailDto: StringEmailDto,
  ): Promise<UserGetDto | null> {
    return await this.userService.getByEmail(stringEmailDto.email);
  }

  /**
   * reception un UserUpdateDTO au user.service
   * pour une mise à jour d'une entitée existante
   * @param user
   * @returns UserUpdateDTO
   */
  @ApiResponse({
    description: 'The updated user ',
    type: UserGetDto,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/update')
  async update(@Body() user: UserUpdateDto): Promise<UserGetDto> {
    return await this.userService.update(user);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Upload avatar image for a user',
    type: UserGetDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/uploadAvatar')
  @UseInterceptors(FileInterceptor('file', multerImgOpt))
  async uploadAvatar(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserGetDto> {
    return await this.userService.updateUserAvatarUrl(file.path, req.user.userId);
  }
}
