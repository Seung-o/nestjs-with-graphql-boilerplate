import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { KakaoService } from './services/kakao.service';
import { JwtTokenGenerator } from './services/jwt-token.service';

@Module({
  imports: [UserModule, JwtModule.register({ global: true }), HttpModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, KakaoService, JwtTokenGenerator],
})
export class AuthModule {}
