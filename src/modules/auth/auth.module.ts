import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from 'src/config/env-config/env-config.module';
import { User, UserSchema } from '../users/user.schema';
import { AuthController } from './auth.controller';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTService, RefreshTokenRepository],
})
export class AuthModule {}
