import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import googleConfig from 'src/config/google.config';
import { UserModule } from 'src/users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [ConfigModule.forFeature(googleConfig), PassportModule, UserModule],
  providers: [AuthResolver, AuthService, GoogleStrategy],
})
export class AuthModule {}
