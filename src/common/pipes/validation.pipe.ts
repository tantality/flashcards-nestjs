/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { Types } from 'mongoose';

@Injectable()
export class ValidationPipe implements PipeTransform<any, any> {
  constructor(private validatorOptions: ValidatorOptions = {}) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<Types.ObjectId> {
    const typedValue = plainToClass(metadata.metatype as ClassConstructor<any>, value);
    const errors = await validate(typedValue, this.validatorOptions);

    if (errors.length) {
      throw new BadRequestException(groupErrorMessagesByPropertyName(errors));
    }

    return typedValue;
  }
}

const groupErrorMessagesByPropertyName = (errors: ValidationError[]): string[] => {
  return errors.map((error) => {
    const groupedMessages = Object.values(error.constraints as object).join('. ');
    return groupedMessages;
  });
};
