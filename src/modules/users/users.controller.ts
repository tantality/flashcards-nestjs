/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  MOCK_USER_ID = '63a21c308ac9d6783208b8d7' as unknown as ObjectId;

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser() {
    return this.usersService.findOne({ id: this.MOCK_USER_ID });
  }

  @Patch('me')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(this.MOCK_USER_ID, updateUserDto);
  }
}
