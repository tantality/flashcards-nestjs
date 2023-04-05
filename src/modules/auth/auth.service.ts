/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LogInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  signUp(signUpDto: SignUpDto) {
    return 'sign up';
  }

  logIn(logInDto: LogInDto) {
    return 'log in';
  }
}
