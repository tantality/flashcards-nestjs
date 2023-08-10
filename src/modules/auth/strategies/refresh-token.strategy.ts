import { Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AUTH_EXCEPTION_MESSAGE } from 'src/common/constants';
import { EnvConfigService } from 'src/config/env-config/env-config.service';
import { STRATEGY_NAME } from '../auth.constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWTService } from '../services/jwt.service';
import { DecodedUserJwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, STRATEGY_NAME.REFRESH_TOKEN_STRATEGY) {
  constructor(private envConfigService: EnvConfigService, private JWTService: JWTService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshTokenFromCookie]),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtRefreshTokenSecret(),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request): Promise<DecodedUserJwtPayload & { refreshTokenId: ObjectId }> {
    const token = req.cookies['refreshToken'] as string;
    const payload = this.JWTService.verifyRefreshToken(token);

    const refreshToken = await this.JWTService.findRefreshToken(token);
    if (!refreshToken) {
      throw new NotFoundException(AUTH_EXCEPTION_MESSAGE.REFRESH_TOKEN_NOT_FOUND);
    }

    return { ...payload, refreshTokenId: refreshToken._id };
  }
}

const extractRefreshTokenFromCookie = (req: Request): string => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    throw new UnauthorizedException(AUTH_EXCEPTION_MESSAGE.REFRESH_TOKEN_IS_MISSING);
  }

  return refreshToken;
};
