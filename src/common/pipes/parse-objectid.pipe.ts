/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidationException } from '../exceptions';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);
    const argumentName = metadata.data;

    if (!validObjectId) {
      throw new ValidationException([`${argumentName} must be a mongodb id`]);
    }

    return new Types.ObjectId(value);
  }
}
