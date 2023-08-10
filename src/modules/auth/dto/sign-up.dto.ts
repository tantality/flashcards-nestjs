import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { RemoveExtraSpaces } from 'src/common/decorators';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, SIGN_UP_DTO_PROPERTY_DESCRIPTION, SIGN_UP_DTO_PROPERTY_EXAMPLE } from '../auth.constants';
import { LogInDto } from './log-in.dto';

export class SignUpDto extends LogInDto {
  @ApiProperty({ description: SIGN_UP_DTO_PROPERTY_DESCRIPTION.NAME, example: SIGN_UP_DTO_PROPERTY_EXAMPLE.NAME })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  @RemoveExtraSpaces()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: SIGN_UP_DTO_PROPERTY_DESCRIPTION.NATIVE_LANGUAGE_ID,
    example: SIGN_UP_DTO_PROPERTY_EXAMPLE.NATIVE_LANGUAGE_ID,
    type: String,
  })
  @IsMongoId()
  readonly nativeLanguageId: ObjectId;
}
