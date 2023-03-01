import { IsString, Length } from 'class-validator';
import { RemoveExtraSpaces, ToLowerCase } from 'src/common/decorators';
import { MAX_CODE_LENGTH, MAX_NAME_LENGTH, MIN_CODE_LENGTH, MIN_NAME_LENGTH } from '../languages.constants';

export class CreateLanguageDto {
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  @RemoveExtraSpaces()
  @IsString()
  readonly name: string;

  @Length(MIN_CODE_LENGTH, MAX_CODE_LENGTH)
  @RemoveExtraSpaces()
  @ToLowerCase()
  @IsString()
  readonly code: string;
}
