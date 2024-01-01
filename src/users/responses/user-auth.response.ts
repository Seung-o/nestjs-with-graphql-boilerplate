import { UserProvider } from '../enums/user-provider.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { UserAuth } from '../interfaces/user-auth.interface';
import { User } from '../interfaces/user.interface';

@ObjectType()
export class UserAuthResponse implements UserAuth {
  @Field()
  id: string;

  @Field(() => UserProvider)
  provider: UserProvider;

  @Exclude()
  user: User;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
