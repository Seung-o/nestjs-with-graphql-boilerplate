import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserAuthManager } from './services/user-auth-manager.service';
import { UserManager } from './services/user-manager.service';
import { CreateSocialUserInput } from './inputs/user.input';
import {UpdateUserDTO} from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userManager: UserManager, private readonly userAuthManager: UserAuthManager) {}

  async createSocialUser(args: CreateSocialUserInput) {
    const { provider, ...basicInfo } = args;
    const user: UserEntity = await this.userManager.createUser(basicInfo);
    await this.userAuthManager.createUserAuth({ user, provider });
    return user;
  }

  async isExistUser(email: string): Promise<boolean> {
    return await this.userManager.isExistUser(email);
  }

  async getUser(userId: string): Promise<UserEntity> {
    return await this.userManager.getUserBy({ id: userId });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userManager.getUserBy({ email });
  }

  async getUserAuths(userId: string) {
    return await this.userAuthManager.getUserAuthsBy({ userId });
  }

  async updateUser(userId: string, dto: UpdateUserDTO) {
    return await this.userManager.updateUser(userId, dto);
  }
}
