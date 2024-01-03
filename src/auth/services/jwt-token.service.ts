import {Injectable, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {JwtPayload, JwtToken} from '../dto/jwt.dto';

@Injectable()
export class JwtTokenGenerator {
  private readonly accessTokenSecret: string;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.accessTokenSecret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
    this.accessTokenExpiresIn = this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN');
    this.refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
    this.refreshTokenExpiresIn = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN');
  }

  sign(userId: string): JwtToken {
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

    return { userId, accessToken, refreshToken };
  }

  refresh(refreshToken: string) {
    try{
    const payload: JwtPayload = this.jwtService.verify<JwtPayload>(refreshToken, {secret: this.refreshTokenSecret});
    return this.sign(payload.userId);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
