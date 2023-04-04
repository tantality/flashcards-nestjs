/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, Injectable, ArgumentMetadata, ValidationPipeOptions } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions';
import { groupValidationErrorMessagesByPropertyName } from '../utils';

@Injectable()
export class ValidationPipe implements PipeTransform<any, any> {
  constructor(private validationOptions: ValidationPipeOptions = {}) {}

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    const typedValue = plainToClass(metatype as ClassConstructor<any>, value);
    const errors = await validate(typedValue, this.validationOptions);

    if (errors.length) {
      throw new ValidationException(groupValidationErrorMessagesByPropertyName(errors));
    }

    return typedValue;
  }
}
