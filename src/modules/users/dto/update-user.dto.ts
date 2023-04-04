import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { USER_DTO_PROPERTY_DESCRIPTION, USER_DTO_PROPERTY_EXAMPLE } from '../users.constants';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: USER_DTO_PROPERTY_DESCRIPTION.NATIVE_LANGUAGE_ID,
    example: USER_DTO_PROPERTY_EXAMPLE.NATIVE_LANGUAGE_ID,
  })
  @IsMongoId()
  readonly nativeLanguageId: ObjectId;
}
