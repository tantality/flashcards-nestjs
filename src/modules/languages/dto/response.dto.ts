import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, instanceToPlain, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { Language } from '../language.schema';
import { LANGUAGE_DTO_PROPERTY_DESCRIPTIONS, LANGUAGE_DTO_PROPERTY_EXAMPLES } from '../languages.constants';

@Exclude()
export class LanguageResponseDto {
  @ApiProperty({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.ID, example: LANGUAGE_DTO_PROPERTY_EXAMPLES.ID })
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString())
  readonly _id: ObjectId;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.NAME, example: LANGUAGE_DTO_PROPERTY_EXAMPLES.NAME })
  @Expose()
  readonly name: string;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.CODE, example: LANGUAGE_DTO_PROPERTY_EXAMPLES.CODE })
  @Expose()
  readonly code: string;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.CREATED_AT })
  @Expose()
  readonly createdAt: Date;

  constructor(partial: Partial<LanguageResponseDto>) {
    Object.assign(this, partial);
  }

  toJSON?(): Record<string, any> {
    return instanceToPlain(this);
  }
}

@Exclude()
export class AllLanguagesResponseDto {
  @ApiProperty({ description: 'The count of languages corresponding to the filtering condition in the query', example: 1 })
  @Expose()
  readonly count: number;

  @ApiProperty({ description: 'The list of languages', type: [LanguageResponseDto] })
  @Expose()
  @Type(() => LanguageResponseDto)
  readonly languages: Language[];

  constructor(partial: Partial<AllLanguagesResponseDto>) {
    Object.assign(this, partial);
  }
}
