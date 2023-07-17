import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import jwtConfig from "./config/jwt.config";



@Module({
  imports: [ConfigModule.forFeature(jwtConfig), PassportModule, UserModule, JwtModule.register(jwtConfig())],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
