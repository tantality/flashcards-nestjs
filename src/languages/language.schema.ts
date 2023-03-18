import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CommonSchemaProperties } from 'src/common/classes';

export type LanguageDocument = HydratedDocument<Language>;

@Schema()
export class Language extends CommonSchemaProperties {
  @Prop({ required: true })
    name: string;

  @Prop({ unique: true, index: true, required: true })
    code: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
LanguageSchema.index({ createdAt: 1 });
