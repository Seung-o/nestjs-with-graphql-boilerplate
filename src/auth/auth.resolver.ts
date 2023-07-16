import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SocialProfile } from './decorators/social-profile.decorator';
import { SocialAuthGuard } from './guards/social-auth.guard';
import { UserPayload } from './types';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query() 
  @UseGuards(new SocialAuthGuard())
  async googleAuth(): Promise<string> {
      return "googleAuth";
  }

  @UseGuards(SocialAuthGuard)
  @Mutation('socialSignup')
  async socialSignup(@SocialProfile() profile: UserPayload) {
    return await this.authService.socialSignup(profile);
  }
}
