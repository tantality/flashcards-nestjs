import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { EnvConfigModule } from 'src/config/env-config/env-config.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

@Module({
  imports: [EnvConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JWTService],
})
export class AuthModule {}
