/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { USER_ROLE } from 'src/modules/users/users.constants';
import { SignUpDto, LogInDto, AuthResponseDto } from '../dto';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthService {
  TOKENS_PAYLOAD = { userId: '63a21c308ac9d6783208b8d7' as unknown as ObjectId, role: USER_ROLE.USER };

  constructor(private jwtService: JWTService) {}

  signUp = async (signUpDto: SignUpDto): Promise<AuthResponseDto> => {
    const tokens = this.jwtService.generateTokens(this.TOKENS_PAYLOAD);

    await this.jwtService.saveRefreshToken(this.TOKENS_PAYLOAD.userId, tokens.refreshToken);

    return {
      userId: this.TOKENS_PAYLOAD.userId,
      ...tokens,
    };
  };

  logIn = async (logInDto: LogInDto): Promise<AuthResponseDto> => {
    const tokens = this.jwtService.generateTokens(this.TOKENS_PAYLOAD);

    return {
      userId: this.TOKENS_PAYLOAD.userId,
      ...tokens,
    };
  };
}
