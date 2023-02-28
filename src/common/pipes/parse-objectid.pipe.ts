/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);
    const argumentName = metadata.data;

    if (!validObjectId) {
      throw new BadRequestException(`${argumentName} must be a mongodb id`);
    }

    return new Types.ObjectId(value);
  }
}
