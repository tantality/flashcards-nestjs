import { Transform } from 'class-transformer';
import { isString } from 'class-validator';

export function RemoveExtraSpaces(): PropertyDecorator {
  return Transform(({ value }) => tryToRemoveExtraSpaces(value));
}

const tryToRemoveExtraSpaces = (value: any): any => {
  if (!isString(value)) {
    return value;
  }

  return String(value).trim().replace(/\s+/g, ' ');
};
