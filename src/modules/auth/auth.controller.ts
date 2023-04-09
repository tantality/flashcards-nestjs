import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './services/auth.service';
import { AuthResponseDto, LogInDto, SignUpDto } from './dto';
import { COOKIE_OPTIONS } from './auth.constants';
import { SkipAccessTokenCheck } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @SkipAccessTokenCheck()
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    const authDto = await this.authService.signUp(signUpDto);
    res.cookie('refreshToken', authDto.refreshToken, COOKIE_OPTIONS);

    return authDto;
  }

  @Post('log-in')
  @SkipAccessTokenCheck()
  async logIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    const authDto = await this.authService.logIn(logInDto);
    res.cookie('refreshToken', authDto.refreshToken, COOKIE_OPTIONS);

    return authDto;
  }
}
