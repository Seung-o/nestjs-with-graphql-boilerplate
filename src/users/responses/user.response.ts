import { User } from '../entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserAuthResponse } from './user-auth.response';

@ObjectType()
export class UserResponse extends User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Date)
  lastLoginTime: Date;

  @Field(() => [UserAuthResponse])
  auths: UserAuthResponse[];

  @Field()
  accessToken: string;
}
