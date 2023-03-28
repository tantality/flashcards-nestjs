import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserDto {
  @IsMongoId()
  readonly nativeLanguageId: ObjectId;
}
