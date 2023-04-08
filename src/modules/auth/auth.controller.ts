import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResponseDto, LogInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): AuthResponseDto {
    return this.authService.signUp(signUpDto);
  }

  @Post('log-in')
  logIn(@Body() logInDto: LogInDto): AuthResponseDto {
    return this.authService.logIn(logInDto);
  }
}
