import { EntityRepository, Repository } from 'typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { UserProvider } from 'src/graphql';

@EntityRepository(UserAuth)
export class UserAuthRepository extends Repository<UserAuth> {
  async createUserAuth(userAuth: Partial<UserAuth>) {
    const insertResult = await this.insert(this.create(userAuth));
    return insertResult[0];
  }
}
