import { ObjectId } from 'mongoose';

export class AuthResponseDto {
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
}
