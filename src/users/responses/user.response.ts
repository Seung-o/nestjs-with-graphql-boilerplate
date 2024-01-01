import { Field, ObjectType } from '@nestjs/graphql';
import { UserAuthResponse } from './user-auth.response';
import { User } from '../interfaces/user.interface';

@ObjectType()
export class UserResponse implements User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Date)
  lastLoginTime: Date;

  @Field((_type) => [UserAuthResponse])
  auths: UserAuthResponse[];

  @Field({ nullable: true })
  refreshToken?: string;
}
