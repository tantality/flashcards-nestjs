/* eslint-disable require-await */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from '../../config/env-config/env-config.module';
import { LanguagesModule } from '../languages/languages.module';

@Module({
  imports: [EnvConfigModule, MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI as string), LanguagesModule],
})
export class AppModule {}
