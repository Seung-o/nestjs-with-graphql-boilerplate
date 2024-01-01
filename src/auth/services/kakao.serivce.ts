import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetKakaoProfileDTO } from '../dto/kakao.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async getKakaoProfile(dto: GetKakaoProfileDTO) {
    const kakaoProfile = this.httpService.post(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: dto.clientId,
        redirect_uri: dto.redirectUri,
        code: dto.code,
        client_secret: dto.clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return (await firstValueFrom(kakaoProfile)).data;
  }
}
