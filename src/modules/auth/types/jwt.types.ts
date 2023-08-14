import { ObjectId } from 'mongoose';
import { USER_ROLE } from 'src/modules/users/users.constants';

interface JwtPayload {
  iat: number;
  exp: number;
}

export interface UserJwtPayload {
  userId: ObjectId;
  role: USER_ROLE;
}

export type DecodedUserJwtPayload = JwtPayload & UserJwtPayload;

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  _id: ObjectId;
  value: string;
  expiresAt: Date;
}
