import { Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserAuthResponse } from './responses/user-auth.response';

@Resolver((of) => UserAuthResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
