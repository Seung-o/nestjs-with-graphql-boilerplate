import { UserAuth } from '../entities/user-auth.entity';
import { UserProvider } from '../enums/user-provider.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserAuthResponse extends UserAuth {
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
