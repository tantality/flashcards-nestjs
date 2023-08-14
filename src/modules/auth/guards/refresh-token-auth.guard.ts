import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_NAME } from '../auth.constants';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(STRATEGY_NAME.REFRESH_TOKEN_STRATEGY) {}
