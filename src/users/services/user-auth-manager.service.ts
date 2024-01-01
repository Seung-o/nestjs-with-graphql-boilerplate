import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserAuthEntity } from '../entities/user-auth.entity';

@Injectable()
export class UserAuthManager {
  constructor(@InjectRepository(UserAuthEntity) private readonly userAuthRepository: Repository<UserAuthEntity>) {}

  async createUserAuth(args: DeepPartial<UserAuthEntity>) {
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
