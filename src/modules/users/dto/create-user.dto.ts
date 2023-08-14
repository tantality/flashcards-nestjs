import { ObjectId } from 'mongoose';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly normalizedEmail: string;
  readonly password: string;
  readonly nativeLanguageId: ObjectId;
}
