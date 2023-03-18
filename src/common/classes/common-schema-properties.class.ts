import { ObjectId } from 'mongoose';

export class CommonSchemaProperties {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
