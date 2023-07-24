import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Input } from '../graphql/args/input.args';
import { CreateSocialUserInput } from '../users/inputs/user.input';
import { UserResponse } from '../users/responses/user.response';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => UserResponse)
  async socialSignup(@Input() payload: CreateSocialUserInput) {
    return await this.authService.socialSignup(payload);
  }
}
