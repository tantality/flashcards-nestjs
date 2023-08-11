import { Controller, Get, Body, Patch, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RESPONSE_STATUS_DESCRIPTION, USER_EXCEPTION_MESSAGE } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { User } from 'src/common/decorators';
import { DecodedUserJwtPayload } from '../auth/types';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponseDto } from './dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get a user' })
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async getUser(@User() payload: DecodedUserJwtPayload): Promise<UserResponseDto> {
    const user = await this.usersService.findOne({ _id: payload.userId });
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
  async updateUser(@User() payload: DecodedUserJwtPayload, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedLanguage = await this.usersService.update(payload.userId, updateUserDto);
    return updatedLanguage;
  }
}
