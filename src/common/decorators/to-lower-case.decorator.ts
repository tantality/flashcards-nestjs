import { Transform } from 'class-transformer';
import { isString } from 'class-validator';

export function ToLowerCase(): PropertyDecorator {
  return Transform(({ value }) => tryToConvertValueToLowerCase(value));
}

const tryToConvertValueToLowerCase = (value: any): any => {
  if (!isString(value)) {
    return value;
  }

  return String(value).toLowerCase();
};
