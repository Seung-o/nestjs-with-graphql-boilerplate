import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/graphql';
import { UserRepository } from './repositories/user.repository';
import { UserAuthService } from './services/user-auth.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly userAuthService: UserAuthService) {}

  async createUser(args: CreateUserInput) {
    const { provider, ...basicInfo } = args;
    const user = await this.userRepository.createUser(basicInfo);
    await this.userAuthService.createUserAuth({ userId: user.id, provider });
    return user;
  }
}
