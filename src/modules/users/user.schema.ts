import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { CommonSchemaProperties } from 'src/common/classes';
import { SCHEMA_OPTIONS } from 'src/common/constants';
import { USER_ROLE } from './users.constants';

export type UserDocument = HydratedDocument<User>;

@Schema(SCHEMA_OPTIONS)
export class User extends CommonSchemaProperties {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Language', default: null })
    nativeLanguageId: ObjectId;

  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    email: string;

  @Prop({ unique: true, index: true, required: true })
    normalizedEmail: string;

  @Prop({ required: true })
    password: string;

  @Prop({ enum: Object.values(USER_ROLE), default: USER_ROLE.USER })
    role: USER_ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
