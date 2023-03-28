import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { RemoveExtraSpaces, ToLowerCase } from 'src/common/decorators';
import {
  LANGUAGE_DTO_PROPERTY_DESCRIPTIONS,
  LANGUAGE_DTO_PROPERTY_EXAMPLES,
  MAX_CODE_LENGTH,
  MAX_NAME_LENGTH,
  MIN_CODE_LENGTH,
  MIN_NAME_LENGTH,
} from '../languages.constants';

export class CreateLanguageDto {
  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.NAME, example: LANGUAGE_DTO_PROPERTY_EXAMPLES.NAME })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  @RemoveExtraSpaces()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.CODE, example: LANGUAGE_DTO_PROPERTY_EXAMPLES.CODE })
  @Length(MIN_CODE_LENGTH, MAX_CODE_LENGTH)
  @RemoveExtraSpaces()
  @ToLowerCase()
  @IsString()
  readonly code: string;
}
