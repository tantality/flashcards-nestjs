export const MIN_NAME_LENGTH = 5;
export const MAX_NAME_LENGTH = 256;

export const MIN_PASSWORD_LENGTH = 8;

export const ACCESS_TOKEN_LIFETIME_IN_MS = 30 * 60 * 1000; // 30 minutes
export const REFRESH_TOKEN_LIFETIME_IN_SEC = 2 * 30 * 24 * 60 * 60; // 60 days
export const REFRESH_TOKEN_LIFETIME_IN_MS = REFRESH_TOKEN_LIFETIME_IN_SEC * 1000; // 60 days

export const SALT_ROUNDS = 10;

export enum STRATEGY_NAME {
  ACCESS_TOKEN_STRATEGY = 'accessTokenStrategy',
  REFRESH_TOKEN_STRATEGY = 'refreshTokenStrategy',
}

export enum COOKIE_NAME {
  REFRESH_TOKEN = 'refreshToken',
}

export enum LOG_IN_DTO_PROPERTY_DESCRIPTION {
  PASSWORD = 'The password of the user',
  EMAIL = 'The email of the user',
}

export enum LOG_IN_DTO_PROPERTY_EXAMPLE {
  PASSWORD = 'b*!E:q8P^3^K6',
  EMAIL = 'coolemail@gmail.com',
}

export enum SIGN_UP_DTO_PROPERTY_DESCRIPTION {
  NAME = 'The name of the user',
  NATIVE_LANGUAGE_ID = 'The id of the user\'s native language',
}

export enum SIGN_UP_DTO_PROPERTY_EXAMPLE {
  NAME = 'Angelina',
  NATIVE_LANGUAGE_ID = '63bca3bacef11ea37e9a4e53',
}

export enum AUTH_RESPONSE_DTO_PROPERTY_EXAMPLES {
  USER_ID = '63a21c308ac9d6783208b8d7',
  ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQ1MzIzNTczNzA2YTBmOThhODFlOGYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5MTY5MzYyMSwiZXhwIjoxNjkxNjk1NDIxfQ.9ooXvK21-AmEdiIcF13Gv7GsqKNwCfImA8c_UEV0XaY',
  REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMxODM5ZTNkZGVlYTEzMjk0Yzc1NDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MTAzODc3OCwiZXhwIjoxNjgxMDQwNTc4fQ.7f2V16_JmeogC5Ip6r-zeZhVlkkRxyDKBYHwdLPoZlo',
}
