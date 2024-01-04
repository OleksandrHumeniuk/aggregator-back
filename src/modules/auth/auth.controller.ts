import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from '@/modules/auth/auth.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterRequest) {
    return await this.authService.register(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: LoginRequest) {
    return await this.authService.login(body.email, body.password);
  }
}
