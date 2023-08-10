import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { ObjectId } from 'mongoose';
import { User, RefreshToken } from 'src/common/decorators';
import { AuthService } from './services/auth.service';
import { AuthResponseDto, LogInDto, SignUpDto } from './dto';
import { COOKIE_NAME, REFRESH_TOKEN_LIFETIME_IN_MS } from './auth.constants';
import { SkipAccessTokenCheck } from './decorators';
import { DecodedUserJwtPayload } from './types';
import { RefreshTokenAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  COOKIE_OPTIONS: CookieOptions = { maxAge: REFRESH_TOKEN_LIFETIME_IN_MS, httpOnly: true, sameSite: 'strict' };

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @SkipAccessTokenCheck()
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    const authDto = await this.authService.signUp(signUpDto);
    res.cookie(COOKIE_NAME.REFRESH_TOKEN, authDto.refreshToken, this.COOKIE_OPTIONS);

    return authDto;
  }

  @Post('log-in')
  @SkipAccessTokenCheck()
  async logIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    const authDto = await this.authService.logIn(logInDto);
    res.cookie(COOKIE_NAME.REFRESH_TOKEN, authDto.refreshToken, this.COOKIE_OPTIONS);

    return authDto;
  }

  @Get('log-out')
  async logOut(
    @User() payload: DecodedUserJwtPayload,
      @RefreshToken() token: any,
      @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.logOut(payload.userId, token);
    res.clearCookie(COOKIE_NAME.REFRESH_TOKEN);

    return;
  }

  @Post('refresh-tokens')
  @UseGuards(RefreshTokenAuthGuard)
  @SkipAccessTokenCheck()
  async refreshTokens(
    @User() payload: DecodedUserJwtPayload & { refreshTokenId: ObjectId },
      @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { refreshTokenId: tokenId, userId, role } = payload;
    const authData = await this.authService.refreshTokens(tokenId, { userId, role });
    res.cookie(COOKIE_NAME.REFRESH_TOKEN, authData.refreshToken, this.COOKIE_OPTIONS);

    return authData;
  }
}
