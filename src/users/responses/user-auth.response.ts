import { UserAuth } from '../entities/user-auth.entity';
import { UserProvider } from '../enums/user-provider.enum';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAuthResponse extends UserAuth {
  @Field()
  id: string;

  @Field(() => UserProvider)
  provider: UserProvider;
}
