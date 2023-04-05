import { ObjectId } from 'mongoose';
import { LogInDto } from './log-in.dto';

export class SignUpDto extends LogInDto {
  readonly name: string;
  readonly nativeLanguageId: ObjectId;
}
