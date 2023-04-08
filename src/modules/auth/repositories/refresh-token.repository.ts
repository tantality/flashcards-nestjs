import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/user.schema';

@Injectable()
export class RefreshTokenRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  save = async (userId: ObjectId, token: string): Promise<void> => {
    await this.userModel.updateOne({ _id: userId }, { $push: { refreshTokens: { value: token } } });
  };
}
