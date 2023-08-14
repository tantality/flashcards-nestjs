import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(private messages: string[]) {
    const status = HttpStatus.BAD_REQUEST;
    const response = { status, messages, error: 'Bad request' };
    super(response, status);
  }
}
