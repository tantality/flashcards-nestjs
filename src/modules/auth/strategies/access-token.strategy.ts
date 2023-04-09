import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EnvConfigService } from 'src/config/env-config/env-config.service';
import { JwtPayload } from '../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'accessTokenStrategy') {
  constructor(private envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtAccessTokenSecret(),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
