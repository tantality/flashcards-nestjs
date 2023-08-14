import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ObjectIdToString } from 'src/common/decorators';

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
export class AllCardsResponseDto {}
