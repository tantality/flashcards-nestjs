import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CommonSchemaProperties } from 'src/common/classes';
import { SCHEMA_OPTIONS } from 'src/common/constants';

export type UserDocument = HydratedDocument<User>;

@Schema(SCHEMA_OPTIONS)
export class User extends CommonSchemaProperties {}

export const UserSchema = SchemaFactory.createForClass(User);
