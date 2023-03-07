import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ timestamps: true })
export class Language {
  @Prop({ required: true })
    name: string;

  @Prop({ unique: true, index: true, required: true })
    code: string;

  createdAt: Date;
  updatedAt: Date;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
LanguageSchema.index({ createdAt: 1 });
