/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getMongodbConnectionURI(): string {
    return this.configService.get('MONGODB_CONNECTION_URI')!;
  }

  getAppPort(): number {
    const DEFAULT_PORT = 8080;
    return Number(this.configService.get('PORT')) || DEFAULT_PORT;
  }

  getJwtAccessTokenSecret(): string {
    return this.configService.get('JWT_ACCESS_TOKEN_SECRET')!;
  }

  getJwtRefreshTokenSecret(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_SECRET')!;
  }

  getAdminEmail(): string {
    return this.configService.get('ADMIN_EMAIL')!;
  }

  getAdminPassword(): string {
    return this.configService.get('ADMIN_PASSWORD')!;
  }
}
