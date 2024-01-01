import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { InsertResult, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserManager {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async createUser(user: Partial<UserEntity>) {
    const insertResult: InsertResult = await this.userRepository.insert(this.userRepository.create(user));

    if (insertResult.identifiers.length > 0) {
      return await this.userRepository.findOneBy(insertResult.identifiers[0]);
    }

    return null;
  }

  async isExistUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return !_.isNil(user) && !_.isEmpty(user);
  }

  async getUserBy(dto: Partial<Pick<UserEntity, 'id' | 'email'>>) {
    return await this.userRepository.findOneBy(dto);
  }
}
