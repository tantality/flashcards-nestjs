import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { MIN_STRING_LENGTH, MAX_STRING_LENGTH } from 'src/common/constants';
import { RemoveExtraSpaces } from 'src/common/decorators';
import { BaseQueryDto } from 'src/common/dto';
import { CARD_SORT_BY } from '../cards.constants';

export class GetAllCardsQueryDto extends BaseQueryDto {
  @IsIn(Object.values(CARD_SORT_BY))
  readonly sortBy: CARD_SORT_BY = CARD_SORT_BY.DATE;

  @ApiPropertyOptional({
    description: `The search by language name \n\n Min string length: ${MIN_STRING_LENGTH}, max string length: ${MAX_STRING_LENGTH}`,
  })
  readonly search: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The id of the language. Use this field if you need to return cards using a specific language',
  })
  @RemoveExtraSpaces()
  @IsMongoId()
  @IsOptional()
  readonly languageId: ObjectId;
}
