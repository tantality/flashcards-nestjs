/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  findOne(condition: FilterQuery<User>) {
    return this.userRepository.findOne(condition);
  }
}

