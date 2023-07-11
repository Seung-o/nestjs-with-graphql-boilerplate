import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from '../repositories/user-auth.repository';
import { CreateUserAuthInput } from 'src/graphql';

@Injectable()
export class UserAuthService {
  constructor(private readonly userAuthRepository: UserAuthRepository) {}

  async createUserAuth(args: CreateUserAuthInput) {
    return await this.userAuthRepository.createUserAuth({ ...args, user: { id: args.userId } });
  }
}
