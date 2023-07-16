import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { UserPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async socialSignup(user: UserPayload) {
    const isExistUser = await this.userService.isExistUser(user.email);
    if (isExistUser) {
      return await this.loginSocialUser(user);
    }

    return await this.registerSocialUser(user);
  }

  async registerSocialUser(user: UserPayload) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  async loginSocialUser(user: UserPayload) {
    return;
  }
}
