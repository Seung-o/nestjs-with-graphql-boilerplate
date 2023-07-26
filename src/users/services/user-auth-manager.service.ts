import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserAuth } from '../entities/user-auth.entity';

@Injectable()
export class UserAuthManager {
  constructor(@InjectRepository(UserAuth) private readonly userAuthRepository: Repository<UserAuth>) {}

  async createUserAuth(args: DeepPartial<UserAuth>) {
    const insertResult = await this.userAuthRepository.insert(this.userAuthRepository.create(args));
    if (insertResult.identifiers.length > 0) {
      return await this.userAuthRepository.findOneBy(insertResult.identifiers[0]);
    }

    return null;
  }

  async getUserAuthsBy(dto: { userId: string }) {
    return await this.userAuthRepository.findBy({ user: { id: dto.userId } });
  }
}
