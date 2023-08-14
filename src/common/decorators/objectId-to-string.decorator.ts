import { Transform } from 'class-transformer';

export function ObjectIdToString(): PropertyDecorator {
  return Transform(({ obj }) => obj._id.toString());
}
