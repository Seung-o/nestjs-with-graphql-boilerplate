import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/graphql';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(args: CreateUserInput) {
    const user = this.userRepository.create(args);
    await this.userRepository.insert(user);
    return user;
  }
}
