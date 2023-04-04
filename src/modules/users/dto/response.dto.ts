import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ObjectIdToString } from 'src/common/decorators';

@Exclude()
export class UserResponseDto {
  @Expose({ name: 'id' })
  @ObjectIdToString()
  readonly _id: ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  @ObjectIdToString()
  readonly nativeLanguageId: ObjectId;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  toJSON?(): Record<string, any> {
    return instanceToPlain(this);
  }
}
