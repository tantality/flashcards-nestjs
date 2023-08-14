import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CommonSchemaProperties } from 'src/common/classes';
import { SCHEMA_OPTIONS } from 'src/common/constants';

export type LanguageDocument = HydratedDocument<Language>;

@Schema(SCHEMA_OPTIONS)
export class Language extends CommonSchemaProperties {
  nameInLowercase: string;

  @Prop({ required: true })
    name: string;

  @Prop({ unique: true, index: true, required: true })
    code: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
LanguageSchema.index({ createdAt: 1 });
