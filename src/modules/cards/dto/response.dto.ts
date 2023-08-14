import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, instanceToPlain, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ObjectIdToString } from 'src/common/decorators';
import { Card } from '../card.schema';

@Exclude()
export class CardResponseDto {
  @Expose({ name: 'id' })
  @ObjectIdToString()
  readonly _id: ObjectId;

  @Expose()
  @ObjectIdToString()
  readonly nativeLanguageId: ObjectId;

  @Expose()
  readonly nativeWords: string[];

  @Expose()
  @ObjectIdToString()
  readonly foreignLanguageId: ObjectId;

  @Expose()
  readonly foreignWords: string[];

  @Expose()
  readonly createdAt: Date;

  constructor(partial: Partial<CardResponseDto>) {
    Object.assign(this, partial);
  }

  toJSON?(): Record<string, any> {
    return instanceToPlain(this);
  }
}

@Exclude()
export class AllCardsResponseDto {
  @ApiProperty({ description: 'The count of cards corresponding to the filtering condition in the query', example: 1 })
  @Expose()
  readonly count: number;

  @ApiProperty({ description: 'The list of cards', type: [CardResponseDto] })
  @Expose()
  @Type(() => CardResponseDto)
  readonly cards: Card[];

  constructor(partial: Partial<AllCardsResponseDto>) {
    Object.assign(this, partial);
  }
}
