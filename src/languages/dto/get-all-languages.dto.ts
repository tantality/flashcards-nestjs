import { IsIn } from 'class-validator';
import { RemoveExtraSpaces, ToLowerCase } from 'src/common/decorators';
import { BaseQueryDto } from 'src/common/dto';
import { LANGUAGE_SORT_BY } from '../languages.constants';

export class GetAllLanguagesQueryDto extends BaseQueryDto {
  @IsIn(Object.values(LANGUAGE_SORT_BY))
  @RemoveExtraSpaces()
  @ToLowerCase()
  readonly sortBy: string = LANGUAGE_SORT_BY.DATE;
}
