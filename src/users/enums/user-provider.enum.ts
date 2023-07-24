import { registerEnumType } from '@nestjs/graphql';

export enum UserProvider {
  GOOGLE = 'GOOGLE',
}

registerEnumType(UserProvider, { name: 'UserProvider', description: 'User provider like google, naver, kakao' });
