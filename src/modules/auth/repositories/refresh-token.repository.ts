import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/user.schema';
import { REFRESH_TOKEN_LIFETIME_IN_MS } from '../auth.constants';
import { RefreshToken } from '../types';
import { getTokenFromArray } from '../utils';

@Injectable()
export class RefreshTokenRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne = async (refreshTokenValue: string): Promise<RefreshToken | null> => {
    const tokenInArray: { token: RefreshToken }[] = await this.userModel.aggregate([
      { $match: { refreshTokens: { $elemMatch: { value: refreshTokenValue } } } },
      {
        $project: {
          _id: 0,
          token: {
            $filter: {
              input: '$refreshTokens',
              as: 'refreshToken',
              cond: { $eq: ['$$refreshToken.value', refreshTokenValue] },
            },
          },
        },
      },
      { $unwind: '$token' },
    ]);

    return getTokenFromArray(tokenInArray);
  };

  save = async (userId: ObjectId, token: string): Promise<void> => {
    await this.userModel.updateOne({ _id: userId }, { $push: { refreshTokens: { value: token } } });
  };

  update = async (_id: ObjectId, refreshTokenValue: string): Promise<void> => {
    await this.userModel.updateOne(
      { refreshTokens: { $exists: true } },
      {
        $set: {
          'refreshTokens.$[token].value': refreshTokenValue,
          'refreshTokens.$[token].expiresAt': Date.now() + REFRESH_TOKEN_LIFETIME_IN_MS,
        },
      },
      { arrayFilters: [{ 'token._id': _id }] },
    );
  };

  delete = async (userId: ObjectId, token: string): Promise<void> => {
    await this.userModel.updateOne({ _id: userId }, { $pull: { refreshTokens: { value: token } } });
  };
}
