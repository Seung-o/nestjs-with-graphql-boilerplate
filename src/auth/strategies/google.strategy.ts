// google.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleConfig from 'src/config/google.config';
import { UserProvider } from 'src/graphql';
import { UserPayload } from '../types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
  ) {
    super({
      clientID: googleConf.clientID,
      clientSecret: googleConf.clientSecret,
      callbackURL: googleConf.callbackUrl,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(_request: any, _accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<UserPayload> {
    if (!profile) {
      done(new UnauthorizedException(), false);
    }

    console.log(profile);

    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: UserProvider.GOOGLE,
    };

    return user;
  }
}
