import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  };

  update = async (id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> => {
    await this.userModel.updateOne({ _id: id }, { ...updateUserDto });

    const updatedUser = (await this.findOne({ _id: id })) as User;

    return updatedUser;
  };

  findOne = async (condition: FilterQuery<User>): Promise<User | null> => {
    const user = await this.userModel.findOne(condition);
    return user;
  };
}
