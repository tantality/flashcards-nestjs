import { ObjectId } from 'mongoose';
import { USER_ROLE } from 'src/modules/users/users.constants';

export interface JwtPayload {
  userId: ObjectId;
  role: USER_ROLE;
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}
