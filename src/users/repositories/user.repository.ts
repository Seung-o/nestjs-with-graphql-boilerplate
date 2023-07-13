import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as _ from 'lodash';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: Partial<User>) {
    const insertResult: InsertResult = await this.insert(this.create(user));
    return insertResult.generatedMaps[0];
  }

  async isExistUser(email: string) {
    const user = await this.findOneBy({ email });
    return !_.isNil(user) && !_.isEmpty(user);
  }

  async getUser(dto: Pick<User, 'email'>) {
    const user = await this.findOne({ where: dto, relations: ['auths'] });
    return user;
  }
}
