import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { UserProvider } from '../enums/user-provider.enum';

class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

@InputType()
export class CreateEmailUserInput extends CreateUserInput {
  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class CreateSocialUserInput extends CreateUserInput {
  @Field(() => UserProvider)
  @IsNotEmpty()
  provider: UserProvider;
}
