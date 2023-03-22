import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RemoveExtraSpaces, ToLowerCase } from '../decorators';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  MAX_LIMIT,
  MAX_STRING_LENGTH,
  MIN_INT,
  MIN_LIMIT,
  MIN_STRING_LENGTH,
  SORT_DIRECTION,
} from '../constants';

export class BaseQueryDto {
  @ApiPropertyOptional()
  @Length(MIN_STRING_LENGTH, MAX_STRING_LENGTH)
  @ToLowerCase()
  @RemoveExtraSpaces()
  @IsString()
  @IsOptional()
  readonly search: string;

  @ApiPropertyOptional()
  @Min(MIN_INT)
  @Type(() => Number)
  @IsNumber()
  readonly offset: number = DEFAULT_OFFSET;

  @ApiPropertyOptional()
  @Max(MAX_LIMIT)
  @Min(MIN_LIMIT)
  @Type(() => Number)
  @IsNumber()
  readonly limit: number = DEFAULT_LIMIT;

  @ApiPropertyOptional()
  @IsIn(Object.values(SORT_DIRECTION))
  @ToLowerCase()
  @RemoveExtraSpaces()
  @IsString()
  readonly sortDirection: string = SORT_DIRECTION.ASC;
}
