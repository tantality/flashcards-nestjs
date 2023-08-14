export enum LANGUAGE_EXCEPTION_MESSAGE {
  NOT_FOUND = 'Language not found.',
  ALREADY_EXISTS = 'The language with the specified code already exists.',
  CANNOT_BE_DELETED = 'The language cannot be deleted because it is used in the card(s) or / and is set as the user\'s native language.',
  NATIVE_AND_FOREIGN_LANGUAGE_ARE_EQUAL = 'ForeignLanguageId must be different from the user\'s nativeLanguageId.',
}

export enum USER_EXCEPTION_MESSAGE {
  NOT_FOUND = 'User not found.',
  ALREADY_EXISTS = 'The user with the specified email already exists.',
  NO_NATIVE_LANGUAGE_SET_FOR_THE_USER = 'No native language set for the user',
}

export enum CARD_EXCEPTION_MESSAGE {
  NOT_FOUND = 'Card not found.',
  NO_CARDS_FOUND_WITH_THE_LANGUAGE = 'No cards with the current native or / and foreign language were found.',
}

export enum TASK_EXCEPTION_MESSAGE {
  NOT_FOUND = 'Task not found.',
  ANSWER_TO_TASK_ALREADY_EXISTS = 'The answer has already been recorded for the task.',
}

export enum AUTH_EXCEPTION_MESSAGE {
  INVALID_PASSWORD = 'Invalid password',
  ADMIN_ACTION = 'This action is available only to the administrator.',
  ACCESS_TOKEN_IS_MISSING_OR_INVALID = 'Access token is missing or invalid.',
  REFRESH_TOKEN_NOT_FOUND = 'Refresh token not found.',
  REFRESH_TOKEN_IS_MISSING = 'Refresh token is missing.',
  REFRESH_TOKEN_IS_INVALID = 'Refresh token is invalid.',
}

export enum RESPONSE_STATUS_DESCRIPTION {
  BAD_REQUEST = 'Bad request',
  NO_CONTENT = 'Ok, no content to return',
  NOT_FOUND = 'Resource not found',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
}
