import { Controller, Get, Body, Patch, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { USER_EXCEPTION_MESSAGES } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponseDto } from './dto';

@Controller('users')
export class UsersController {
  MOCK_USER_ID = '63a21c308ac9d6783208b8d7' as unknown as ObjectId;

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async getUser(): Promise<UserResponseDto> {
    const user = await this.usersService.findOne({ id: this.MOCK_USER_ID });
    if (!user) {
      throw new NotFoundException(USER_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    return user;
  }

  @Patch('me')
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedLanguage = await this.usersService.update(this.MOCK_USER_ID, updateUserDto);
    return updatedLanguage;
  }
}
