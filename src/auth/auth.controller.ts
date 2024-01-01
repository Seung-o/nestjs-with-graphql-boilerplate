import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Get('kakao/callback')
  async authKakao(@Query() query: KakaoRedirectInput, @Res() res: Response) {
    const client = this.configService.get<string>('CLIENT');
    const { accessToken, refreshToken } = await this.authService.signupByKakao(query);
    res.redirect(`${client}/auth?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
}
