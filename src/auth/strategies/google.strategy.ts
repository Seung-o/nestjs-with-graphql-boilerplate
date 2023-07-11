// google.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleConfig from 'src/config/google.config';
import { UserProvider } from 'src/graphql';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'GOOGLE') {
  constructor(
    @Inject(googleConfig.KEY)
    private googleConf: ConfigType<typeof googleConfig>,
  ) {
    super({
      clientID: googleConf.clientID,
      clientSecret: googleConf.clientSecret,
      callbackURL: googleConf.callbackUrl,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
    if (!profile) {
      done(new UnauthorizedException(), false);
    }

    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: UserProvider.GOOGLE,
    };

    done(null, user);
  }
}
