import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK_KEY } from '../decorators';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('accessTokenStrategy') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isRouteFreeFromAccessTokenCheck = this.reflector.getAllAndOverride<boolean>(
      IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isRouteFreeFromAccessTokenCheck) {
      return true;
    }

    return super.canActivate(context);
  }
}
