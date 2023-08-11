import { Controller, Get, Body, Patch, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RESPONSE_STATUS_DESCRIPTION } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { CurrentUser } from 'src/common/decorators';
import { DecodedUserJwtPayload } from '../auth/types';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponseDto } from './dto';
import { User } from './user.schema';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get a user' })
  @ApiUnauthorizedResponse({ description: RESPONSE_STATUS_DESCRIPTION.UNAUTHORIZED })
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async getUser(@CurrentUser() payload: DecodedUserJwtPayload): Promise<UserResponseDto> {
    const user = (await this.usersService.findOne({ _id: payload.userId })) as User;
    return user;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiNotFoundResponse({ description: RESPONSE_STATUS_DESCRIPTION.NOT_FOUND })
  @UseInterceptors(new SerializerInterceptor(UserResponseDto))
  async updateUser(@CurrentUser() payload: DecodedUserJwtPayload, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedLanguage = await this.usersService.update(payload.userId, updateUserDto);
    return updatedLanguage;
  }
}
