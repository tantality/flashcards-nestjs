import { Expose, Exclude, instanceToPlain, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

@Exclude()
export class LanguageResponseDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  readonly _id: ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly code: string;

  @Expose()
  readonly createdAt: Date;

  constructor(partial: Partial<LanguageResponseDto>) {
    Object.assign(this, partial);
  }

  toJSON?(): Record<string, any> {
    return instanceToPlain(this);
  }
}
