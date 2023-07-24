import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { CreateSocialUserInput } from '../users/inputs/user.input';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async socialSignup(payload: CreateSocialUserInput) {
    const isExistUser = await this.userService.isExistUser(payload.email);
    if (isExistUser) {
      return await this.loginSocialUser(payload);
    }

    return await this.registerSocialUser(payload);
  }

  async registerSocialUser(payload: CreateSocialUserInput) {
    const user: User = await this.userService.createSocialUser(payload);
    const accessToken: string = this.jwtService.sign(user);
    return { ...user, accessToken };
  }

  async loginSocialUser(payload: CreateSocialUserInput) {
    const user: User = await this.userService.getUserByEmail(payload.email);
    const accessToken: string = this.jwtService.sign({ id: user.id });
    return { ...user, accessToken };
  }
}
