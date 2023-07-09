import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthResolver, AuthService, GoogleStrategy],
})
export class AuthModule {}
