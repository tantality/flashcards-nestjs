import { IsMongoId, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { RemoveExtraSpaces } from 'src/common/decorators';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from '../auth.constants';
import { LogInDto } from './log-in.dto';

export class SignUpDto extends LogInDto {
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  @RemoveExtraSpaces()
  @IsString()
  readonly name: string;

  @IsMongoId()
  readonly nativeLanguageId: ObjectId;
}
