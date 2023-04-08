import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { EnvConfigService } from 'src/config/env-config/env-config.service';
import { ACCESS_TOKEN_LIFETIME_IN_MS, REFRESH_TOKEN_LIFETIME_IN_MS } from '../auth.constants';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { JwtPayload, JwtTokens } from '../types';

@Injectable()
export class JWTService {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
    private envConfigService: EnvConfigService,
  ) {}

  generateTokens = (payload: JwtPayload): JwtTokens => {
    const atSecret = this.envConfigService.getJwtAccessTokenSecret();
    const accessToken = this.jwtService.sign(payload, { secret: atSecret, expiresIn: `${ACCESS_TOKEN_LIFETIME_IN_MS}ms` });

    const rtSecret = this.envConfigService.getJwtRefreshTokenSecret();
    const refreshToken = this.jwtService.sign(payload, { secret: rtSecret, expiresIn: `${REFRESH_TOKEN_LIFETIME_IN_MS}ms` });

    return { accessToken, refreshToken };
  };

  saveRefreshToken = async (userId: ObjectId, token: string): Promise<void> => {
    await this.refreshTokenRepository.save(userId, token);
  };
}
