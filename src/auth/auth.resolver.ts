import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Input } from '../graphql/args/input.args';
import { CreateSocialUserInput } from '../users/inputs/user.input';
import { UserResponse } from '../users/responses/user.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserService } from '../users/user.service';
import { AuthUrlInput } from './inputs/auth-url.input';
import { AuthUrlResponse } from './responses/auth-url.response';

@Resolver(() => UserResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Query(() => AuthUrlResponse)
  async getAuthUrl(@Input() payload: AuthUrlInput) {
    return await this.authService.getAuthUrl(payload.provider);
  }

  @Mutation(() => UserResponse)
  async socialSignup(@Input() payload: CreateSocialUserInput) {
    return await this.authService.socialSignup(payload);
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async me(@AuthorizedUser() user: UserResponse) {
    return user;
  }

  @ResolveField()
  async auths(@Parent() user: UserResponse) {
    return await this.userService.getUserAuths(user.id);
  }
}
