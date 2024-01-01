import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUrlResponse {
  @Field()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
