/* eslint-disable require-await */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from '../../config/env-config/env-config.module';
import { AuthModule } from '../auth/auth.module';
import { LanguagesModule } from '../languages/languages.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [EnvConfigModule, MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI as string), LanguagesModule, UsersModule, AuthModule],
})
export class AppModule {}
