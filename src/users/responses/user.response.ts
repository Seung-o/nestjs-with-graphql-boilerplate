import { UserProvider } from 'src/graphql';
import { User } from '../entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.provider = user.userAuths.map((auth) => auth.provider);
  }
  @Field(() => ID!)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [UserProvider!])
  provider: UserProvider[];
}
