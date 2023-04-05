import { IsEmail, Matches } from 'class-validator';
import { RemoveExtraSpaces } from 'src/common/decorators';
import { MIN_PASSWORD_LENGTH } from '../auth.constants';

const STRONG_PASSWORD_REG_EXP = new RegExp(
  '(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{' + MIN_PASSWORD_LENGTH + ',}',
  'g',
);

export class LogInDto {
  @Matches(STRONG_PASSWORD_REG_EXP)
  @RemoveExtraSpaces()
  readonly password: string;

  @IsEmail()
  @RemoveExtraSpaces()
  readonly email: string;
}
