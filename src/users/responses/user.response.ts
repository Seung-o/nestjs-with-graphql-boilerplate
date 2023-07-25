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

  @Field((_type) => [UserAuthResponse])
  auths: UserAuthResponse[];

  @Field({ nullable: true })
  accessToken?: string;
}
