import { Exclude, Expose, instanceToPlain, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

@Exclude()
export class UserResponseDto {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString())
  readonly _id: ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  readonly nativeLanguageId: ObjectId;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  toJSON?(): Record<string, any> {
    return instanceToPlain(this);
  }
}
