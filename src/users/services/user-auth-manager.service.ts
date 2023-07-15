import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserAuthInput } from 'src/graphql';
import { Repository } from 'typeorm';
import { UserAuth } from '../entities/user-auth.entity';

@Injectable()
export class UserAuthManager {
  constructor(@InjectRepository(UserAuth) private readonly userAuthRepository: Repository<UserAuth>) {}

  async createUserAuth(args: CreateUserAuthInput) {
    const insertResult = await this.userAuthRepository.insert(this.userAuthRepository.create(args));
    return insertResult[0];
  }
}
