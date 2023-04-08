/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { USER_ROLE } from 'src/modules/users/users.constants';
import { SignUpDto, LogInDto } from '../dto';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthService {
  TOKENS_PAYLOAD = { userId: '63a21c308ac9d6783208b8d7' as unknown as ObjectId, role: USER_ROLE.USER };

  constructor(private jwtService: JWTService) {}

  signUp(signUpDto: SignUpDto) {
    const tokens = this.jwtService.generateTokens(this.TOKENS_PAYLOAD);
    return 'sign up';
  }

  logIn(logInDto: LogInDto) {
    const tokens = this.jwtService.generateTokens(this.TOKENS_PAYLOAD);
    return 'log in';
  }
}
