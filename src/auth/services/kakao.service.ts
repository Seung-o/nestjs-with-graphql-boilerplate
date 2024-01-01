import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetKakaoProfileDTO, KakaoProfile, KakaoTokenInfo } from '../dto/kakao.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async getKakaoProfile(dto: GetKakaoProfileDTO): Promise<KakaoProfile> {
    const tokenInfo = await this.getKakaoToken(dto);
    const observable = this.httpService.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return (await firstValueFrom(observable)).data;
  }

  async getKakaoToken(dto: GetKakaoProfileDTO): Promise<KakaoTokenInfo> {
    const observable = this.httpService.post(
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

    return (await firstValueFrom(observable)).data;
  }
}
