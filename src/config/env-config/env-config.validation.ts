import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { ValidationException } from 'src/common/exceptions';
import { groupValidationErrorMessagesByPropertyName } from 'src/common/utils';

export class EnvConfigValidation {
  @IsNumber()
  readonly PORT: number;

  @IsString()
  readonly MONGODB_CONNECTION_URI: string;

  @IsString()
  readonly JWT_ACCESS_TOKEN_SECRET: string;
  @IsString()
  readonly JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  readonly ADMIN_EMAIL: string;
  @IsString()
  readonly ADMIN_PASSWORD: string;
}

export function validate(config: Record<string, unknown>): EnvConfigValidation {
  const typedConfig = plainToClass(EnvConfigValidation, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(config);

  if (errors.length) {
    throw new ValidationException(groupValidationErrorMessagesByPropertyName(errors));
  }

  return typedConfig;
}
