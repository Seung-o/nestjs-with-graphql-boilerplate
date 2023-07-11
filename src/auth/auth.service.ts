import { ConflictException, Injectable } from '@nestjs/common';
import { UserProvider } from 'src/graphql';
import { UserService } from 'src/users/users.service';
import { SocialCallbackInput } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async callbackSocial(user: SocialCallbackInput) {
    const isExistUser = await this.userService.isExistUser(user.email);
    if (isExistUser) {
      throw new ConflictException();
    }

    return await this.registerSocialUser(user);
  }

  async registerSocialUser(user: SocialCallbackInput) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  async loginSocialUser(user: SocialCallbackInput) {
    return;
  }
}
