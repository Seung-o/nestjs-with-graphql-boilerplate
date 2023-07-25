import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { CreateUserAuthInput } from '../inputs/user-auth.input';

@Injectable()
export class UserAuthManager {
  constructor(@InjectRepository(UserAuth) private readonly userAuthRepository: Repository<UserAuth>) {}

  async createUserAuth(args: CreateUserAuthInput) {
    const insertResult = await this.userAuthRepository.insert(this.userAuthRepository.create(args));
    return insertResult[0];
  }

  async getUserAuthsBy(dto: { userId: string }) {
    return await this.userAuthRepository.findBy({ user: { id: dto.userId } });
  }
}
