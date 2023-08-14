import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { CommonSchemaProperties } from 'src/common/classes';
import { SCHEMA_OPTIONS } from 'src/common/constants';

export type CardDocument = HydratedDocument<Card>;

@Schema(SCHEMA_OPTIONS)
export class Card extends CommonSchemaProperties {
  @Prop({ ref: 'User', type: SchemaTypes.ObjectId, required: true, index: true })
    userId: ObjectId;

  @Prop({ ref: 'Language', type: SchemaTypes.ObjectId, required: true })
    nativeLanguageId: ObjectId;

  @Prop({ type: [String], index: true, required: true })
    nativeWords: string[];

  @Prop({ ref: 'Language', type: SchemaTypes.ObjectId, required: true })
    foreignLanguageId: ObjectId;

  @Prop({ type: [String], index: true, required: true })
    foreignWords: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ createdAt: 1 });
CardSchema.index({ nativeLanguageId: 1, foreignLanguageId: 1 });
