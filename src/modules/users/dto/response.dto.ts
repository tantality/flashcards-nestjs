import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ObjectIdToString } from 'src/common/decorators';
import { USER_DTO_PROPERTY_DESCRIPTION, USER_DTO_PROPERTY_EXAMPLE } from '../users.constants';

@Exclude()
export class UserResponseDto {
  @ApiProperty({ name: 'id', type: String, description: USER_DTO_PROPERTY_DESCRIPTION.ID, example: USER_DTO_PROPERTY_EXAMPLE.ID })
  @Expose({ name: 'id' })
  @ObjectIdToString()
  readonly _id: ObjectId;

  @ApiProperty({ description: USER_DTO_PROPERTY_DESCRIPTION.NAME, example: USER_DTO_PROPERTY_EXAMPLE.NAME })
  @Expose()
  readonly name: string;

  @ApiProperty({ description: USER_DTO_PROPERTY_DESCRIPTION.EMAIL, example: USER_DTO_PROPERTY_EXAMPLE.EMAIL })
  @Expose()
  readonly email: string;

  @ApiProperty({ type: String, description: USER_DTO_PROPERTY_DESCRIPTION.NATIVE_LANGUAGE_ID, example: USER_DTO_PROPERTY_EXAMPLE.NATIVE_LANGUAGE_ID })
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
