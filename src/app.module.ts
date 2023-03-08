/* eslint-disable require-await */
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './config/env-config/env-config.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [EnvConfigModule, LanguagesModule],
})
export class AppModule {}
