import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: Partial<User>) {
    const insertResult: InsertResult = await this.insert(this.create(user));
    return insertResult.generatedMaps[0];
  }
}
