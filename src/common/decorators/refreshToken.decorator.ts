import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { COOKIE_NAME } from 'src/modules/auth/auth.constants';

export const RefreshToken = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.cookies[COOKIE_NAME.REFRESH_TOKEN];
});
