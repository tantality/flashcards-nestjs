import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import normalizeEmail from 'normalize-email';
import * as bcrypt from 'bcrypt';
import { AUTH_EXCEPTION_MESSAGE, USER_EXCEPTION_MESSAGE } from 'src/common/constants';
import { USER_ROLE } from 'src/modules/users/users.constants';
import { UsersService } from 'src/modules/users/users.service';
import { SALT_ROUNDS } from '../auth.constants';
import { SignUpDto, LogInDto, AuthResponseDto } from '../dto';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthService {
  TOKENS_PAYLOAD = { userId: '63a21c308ac9d6783208b8d7' as unknown as ObjectId, role: USER_ROLE.USER };

  constructor(private jwtService: JWTService, private usersService: UsersService) {}

  signUp = async (signUpDto: SignUpDto): Promise<AuthResponseDto> => {
    const normalizedEmail = normalizeEmail(signUpDto.email);

    const user = await this.usersService.findOne({ normalizedEmail });
    if (user) {
      throw new BadRequestException(USER_EXCEPTION_MESSAGE.ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, SALT_ROUNDS);
    const createdUser = await this.usersService.create({ ...signUpDto, normalizedEmail, password: hashedPassword });

    const userId = createdUser._id;

    const payload = { userId, role: createdUser.role };
    const tokens = this.jwtService.generateTokens(payload);

    await this.jwtService.saveRefreshToken(userId, tokens.refreshToken);

    return { userId, ...tokens };
  };

  logIn = async ({ email, password }: LogInDto): Promise<AuthResponseDto> => {
    const normalizedEmail = normalizeEmail(email);
    const user = await this.usersService.findOne({ normalizedEmail });
    if (!user) {
      throw new NotFoundException(USER_EXCEPTION_MESSAGE.NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(AUTH_EXCEPTION_MESSAGE.INVALID_PASSWORD);
    }

    const userId = user._id;

    const payload = { userId, role: user.role };
    const tokens = this.jwtService.generateTokens(payload);

    await this.jwtService.saveRefreshToken(userId, tokens.refreshToken);

    return { userId, ...tokens };
  };

  logOut = async (userId: ObjectId, refreshToken: string): Promise<void> => {
    await this.jwtService.deleteRefreshToken(userId, refreshToken);
  };
}
