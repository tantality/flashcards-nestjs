import { ObjectId } from 'mongoose';

export class UserResponseDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly email: string;
  readonly nativeLanguageId: ObjectId;
}
