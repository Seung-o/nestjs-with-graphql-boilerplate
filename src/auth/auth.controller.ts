import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/callback')
  async authKakao(@Query() query: KakaoRedirectInput) {
    return await this.authService.signupByKakao(query);
  }
}
