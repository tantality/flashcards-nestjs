import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from 'src/config/env-config/env-config.module';
import { User, UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';
import { AccessTokenStrategy } from './strategies';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.register({}),
    UsersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTService, RefreshTokenRepository, AccessTokenStrategy],
})
export class AuthModule {}
