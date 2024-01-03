import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { CreateSocialUserInput } from '../users/inputs/user.input';
import { UserProvider } from '../users/enums/user-provider.enum';
import { ConfigService } from '@nestjs/config';
import { AuthUrlResponse } from './responses/auth-url.response';
import { KakaoRedirectInput } from './inputs/auth-kakao.input';
import { KakaoService } from './services/kakao.service';
import { JwtTokenGenerator } from './services/jwt-token.service';
import { JwtToken } from './dto/jwt.dto';
import {User} from "../users/interfaces/user.interface";
import {AuthenticatedUser} from "./dto/auth.dto";
import {JwtAuth} from "./interfaces/auth.interface";

@Injectable()
export class AuthService {
  private readonly kakaoClientId: string;
  private readonly kakaoRedirectUrl: string;
  private readonly kakaoSecret: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenGenerator: JwtTokenGenerator,
    private readonly configService: ConfigService,
    private readonly kakaoService: KakaoService,
  ) {
    this.kakaoClientId = this.configService.get<string>('KAKAO_CLIENT_ID');
    this.kakaoRedirectUrl = this.configService.get<string>('KAKAO_REDIRECT_URI');
    this.kakaoSecret = this.configService.get<string>('KAKAO_SECRET');
  }

  async socialSignup(payload: CreateSocialUserInput) {
    const isExistUser = await this.userService.isExistUser(payload.email);
    if (isExistUser) {
      return await this.loginSocialUser(payload);
    }

    return await this.registerSocialUser(payload);
  }

  async registerSocialUser(payload: CreateSocialUserInput) {
    const user: UserEntity = await this.userService.createSocialUser(payload);
    const jwtToken: JwtToken = this.jwtTokenGenerator.sign(user.id);
    return new AuthenticatedUser({...user, ...jwtToken});
  }

  async loginSocialUser(payload: CreateSocialUserInput) {
    const user: UserEntity = await this.userService.getUserByEmail(payload.email);
    const jwtToken: JwtToken = this.jwtTokenGenerator.sign(user.id);
    return new AuthenticatedUser({...user, ...jwtToken});
  }

  async getAuthUrl(provider: UserProvider): Promise<AuthUrlResponse> {
    let url: string = null;

    if (provider === UserProvider.KAKAO)
      url = `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoRedirectUrl}&response_type=code`;

    return new AuthUrlResponse(url);
  }

  async signupByKakao(query: KakaoRedirectInput): Promise<JwtAuth> {
    const profile = await this.kakaoService.getKakaoProfile({
      code: query.code,
      redirectUri: this.kakaoRedirectUrl,
      clientId: this.kakaoClientId,
      clientSecret: this.kakaoSecret,
    });

    const { id: userId, accessToken, refreshToken } = await this.socialSignup({
      email: profile.kakao_account.email,
      name: profile.kakao_account.profile.nickname,
      provider: UserProvider.KAKAO,
    });

    await this.userService.updateUser(userId, {refreshToken});

    return { accessToken, refreshToken };
  }

  async refreshJwt(refreshToken: string) {
    const jwtToken: JwtToken = this.jwtTokenGenerator.refresh(refreshToken);
    const user: User = await this.userService.getUser(jwtToken.userId);
    return new AuthenticatedUser({...user, ...jwtToken});
  }
}
