import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserAuthManager } from './services/user-auth-manager.service';
import { UserManager } from './services/user-manager.service';
import { CreateSocialUserInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(private readonly userManager: UserManager, private readonly userAuthManager: UserAuthManager) {}

  async createSocialUser(args: CreateSocialUserInput) {
    const { provider, ...basicInfo } = args;
    const user = await this.userManager.createUser(basicInfo);
    await this.userAuthManager.createUserAuth({ userId: user.id, provider });
    return user as User;
  }

  async isExistUser(email: string): Promise<boolean> {
    return await this.userManager.isExistUser(email);
  }

  async getUser(userId: string): Promise<User> {
    return await this.userManager.getUserBy({ id: userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userManager.getUserBy({ email });
  }

  async getUserAuths(userId: string) {
    return await this.userAuthManager.getUserAuthsBy({ userId });
  }
}
