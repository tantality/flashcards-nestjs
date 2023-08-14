import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK_KEY = 'isRouteFreeFromAccessTokenCheck';
export const SkipAccessTokenCheck = (): CustomDecorator<string> => SetMetadata(IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK_KEY, true);
