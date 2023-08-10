import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';
import { RemoveExtraSpaces } from 'src/common/decorators';
import { LOG_IN_DTO_PROPERTY_DESCRIPTION, LOG_IN_DTO_PROPERTY_EXAMPLE, MIN_PASSWORD_LENGTH } from '../auth.constants';

const STRONG_PASSWORD_REG_EXP = new RegExp(
  '(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{' + MIN_PASSWORD_LENGTH + ',}',
  'g',
);

export class LogInDto {
  @ApiProperty({ description: LOG_IN_DTO_PROPERTY_DESCRIPTION.PASSWORD, example: LOG_IN_DTO_PROPERTY_EXAMPLE.PASSWORD })
  @Matches(STRONG_PASSWORD_REG_EXP)
  @RemoveExtraSpaces()
  readonly password: string;

  @ApiProperty({ description: LOG_IN_DTO_PROPERTY_DESCRIPTION.EMAIL, example: LOG_IN_DTO_PROPERTY_EXAMPLE.EMAIL })
  @IsEmail()
  @RemoveExtraSpaces()
  readonly email: string;
}
