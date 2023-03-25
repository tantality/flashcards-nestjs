import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from 'src/common/constants';
import { BaseQueryDto } from 'src/common/dto';
import { LANGUAGE_SORT_BY } from '../languages.constants';

export class GetAllLanguagesQueryDto extends BaseQueryDto {
  @IsIn(Object.values(LANGUAGE_SORT_BY))
  readonly sortBy: LANGUAGE_SORT_BY = LANGUAGE_SORT_BY.DATE;

  @ApiPropertyOptional({
    description: `The search by language name \n\n Min string length: ${MIN_STRING_LENGTH}, max string length: ${MAX_STRING_LENGTH}`,
  })
  readonly search: string;
}
