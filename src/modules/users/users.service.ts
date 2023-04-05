import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import { LANGUAGE_EXCEPTION_MESSAGE, USER_EXCEPTION_MESSAGE } from 'src/common/constants';
import { LanguagesService } from '../languages/languages.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject(forwardRef(() => LanguagesService)) private languagesService: LanguagesService,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    const nativeLanguage = await this.languagesService.findOne({ _id: createUserDto.nativeLanguageId });
    if (!nativeLanguage) {
      throw new NotFoundException(LANGUAGE_EXCEPTION_MESSAGE.NOT_FOUND);
    }

    const user = await this.findOne({ normalizedEmail: createUserDto.normalizedEmail });
    if (user) {
      throw new BadRequestException(USER_EXCEPTION_MESSAGE.ALREADY_EXISTS);
    }

    const createdUser = await this.usersRepository.create(createUserDto);

    return createdUser;
  };

  update = async (id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> => {
    const nativeLanguage = await this.languagesService.findOne({ _id: updateUserDto.nativeLanguageId });
    if (!nativeLanguage) {
      throw new NotFoundException(LANGUAGE_EXCEPTION_MESSAGE.NOT_FOUND);
    }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  };

  findOne = async (condition: FilterQuery<User>): Promise<User | null> => {
    const user = await this.usersRepository.findOne(condition);
    return user;
  };
}
