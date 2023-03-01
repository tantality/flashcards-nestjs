import { Transform } from 'class-transformer';
import { isString } from 'class-validator';

export function ToLowerCase(): PropertyDecorator {
  return Transform(({ value }) => tryToBringValueToLowerCase(value));
}

const tryToBringValueToLowerCase = (value: any): any => {
  if (!isString(value)) {
    return value;
  }

  return String(value).toLowerCase();
};
