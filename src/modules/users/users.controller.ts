import { Controller, Get, Body, Patch, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RESPONSE_STATUS_DESCRIPTION, USER_EXCEPTION_MESSAGE } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponseDto } from './dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  MOCK_USER_ID = '63a21c308ac9d6783208b8d7' as unknown as ObjectId;

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get a user' })
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async getUser(): Promise<UserResponseDto> {
    const user = await this.usersService.findOne({ id: this.MOCK_USER_ID });
    if (!user) {
      throw new NotFoundException(USER_EXCEPTION_MESSAGE.NOT_FOUND);
    }

    return user;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiNotFoundResponse({ description: RESPONSE_STATUS_DESCRIPTION.NOT_FOUND })
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedLanguage = await this.usersService.update(this.MOCK_USER_ID, updateUserDto);
    return updatedLanguage;
  }
}
