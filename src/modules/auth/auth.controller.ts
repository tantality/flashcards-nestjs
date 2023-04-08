import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResponseDto, LogInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const authDto = await this.authService.signUp(signUpDto);
    return authDto;
  }

  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto): Promise<AuthResponseDto> {
    const authDto = await this.authService.logIn(logInDto);
    return authDto;
  }
}
