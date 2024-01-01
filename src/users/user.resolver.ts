import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserAuthResponse } from './responses/user-auth.response';

@Resolver((of) => UserAuthResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  async isExistUser(@Args('email') email: string): Promise<boolean> {
    return await this.userService.isExistUser(email);
  }
}
