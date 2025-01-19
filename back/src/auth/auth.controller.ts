import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './constants/constants';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
