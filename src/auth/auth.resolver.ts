import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Input } from '../graphql/args/input.args';
import { CreateSocialUserInput } from '../users/inputs/user.input';
import { UserResponse } from '../users/responses/user.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizedUser } from '../users/decorators/user.decorator';

@Resolver(() => UserResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  async socialSignup(@Input() payload: CreateSocialUserInput) {
    return await this.authService.socialSignup(payload);
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async me(@AuthorizedUser() user: UserResponse) {
    console.log(user);
    return user;
  }
}
