import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { InsertResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserManager {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(user: Partial<User>) {
    const insertResult: InsertResult = await this.userRepository.insert(this.userRepository.create(user));
    return insertResult.generatedMaps[0];
  }

  async isExistUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return !_.isNil(user) && !_.isEmpty(user);
  }

  async getUserBy(dto: Partial<Pick<User, 'id' | 'email'>>) {
    const user = await this.userRepository.findOneBy(dto);
    return user;
  }
}
