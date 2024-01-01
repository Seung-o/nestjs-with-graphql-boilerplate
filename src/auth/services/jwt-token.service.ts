import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDTO } from '../dto/jwt-token.dto';

@Injectable()
export class JwtTokenGenerator {
  private accessTokenSecret: string;
  private accessTokenExpiresIn: string;
  private refreshTokenSecret: string;
  private refreshTokenExpiresIn: string;

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.accessTokenSecret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
    this.accessTokenExpiresIn = this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN');
    this.refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
    this.refreshTokenExpiresIn = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN');
  }

  sign(userId: string): JwtTokenDTO {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpiresIn,
      },
    );
    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpiresIn,
      },
    );

    return { accessToken, refreshToken };
  }
}
