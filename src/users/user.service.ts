import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/graphql';
import { User } from './entities/user.entity';
import { UserAuthManager } from './services/user-auth-manager.service';
import { UserManager } from './services/user-manager.service';

@Injectable()
export class UserService {
  constructor(private readonly userManager: UserManager, private readonly userAuthManager: UserAuthManager) {}

  async createUser(args: CreateUserInput) {
    const { provider, ...basicInfo } = args;
    const user = await this.userManager.createUser(basicInfo);
    await this.userAuthManager.createUserAuth({ userId: user.id, provider });
    return user as User;
  }

  async isExistUser(email: string): Promise<boolean> {
    return await this.userManager.isExistUser(email);
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userManager.getUserBy({ email });
    return user;
  }
}
