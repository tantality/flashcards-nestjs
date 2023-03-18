import { Prop } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

export class CommonSchemaProperties {
  @Prop({ type: Types.ObjectId })
    _id: ObjectId;
  @Prop()
    createdAt: Date;
  @Prop()
    updatedAt: Date;
}
