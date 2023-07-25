import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserResponse } from './responses/user.response';
import { UserService } from './user.service';
import { UserAuthResponse } from './responses/user-auth.response';

@Resolver((of) => UserAuthResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField('auths', () => [UserAuthResponse])
  async getUserAuths(@Parent() user: UserResponse) {
    console.log('user', user);
    return await this.userService.getUserAuths(user.id);
  }
}
