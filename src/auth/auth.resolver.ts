import { Mutation, Resolver } from '@nestjs/graphql';
import { Input } from 'src/graphql/args/input.args';
import { AuthService } from './auth.service';
import { UserPayload } from './types';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('socialSignup')
  async socialSignup(@Input() payload: UserPayload) {
    return await this.authService.socialSignup(payload);
  }
}
