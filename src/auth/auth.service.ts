import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { UserPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async socialSignup(payload: UserPayload) {
    const isExistUser = await this.userService.isExistUser(payload.email);
    if (isExistUser) {
      return await this.loginSocialUser(payload);
    }

    return await this.registerSocialUser(payload);
  }

  async registerSocialUser(payload: UserPayload) {
    const user = await this.userService.createUser(payload);
    return this.jwtService.sign(user);
  }

  async loginSocialUser(payload: UserPayload) {
    const user = await this.userService.getUser(payload.email);
    return this.jwtService.sign(user);
  }
}
