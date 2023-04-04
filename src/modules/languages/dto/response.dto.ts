import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, instanceToPlain, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { Language } from '../language.schema';
import { LANGUAGE_DTO_PROPERTY_DESCRIPTION, LANGUAGE_DTO_PROPERTY_EXAMPLE } from '../languages.constants';

@Exclude()
export class LanguageResponseDto {
  @ApiProperty({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.ID, example: LANGUAGE_DTO_PROPERTY_EXAMPLE.ID })
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString())
  readonly _id: ObjectId;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.NAME, example: LANGUAGE_DTO_PROPERTY_EXAMPLE.NAME })
  @Expose()
  readonly name: string;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.CODE, example: LANGUAGE_DTO_PROPERTY_EXAMPLE.CODE })
  @Expose()
  readonly code: string;

  @ApiProperty({ description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.CREATED_AT })
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
