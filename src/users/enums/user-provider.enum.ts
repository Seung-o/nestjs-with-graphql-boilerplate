import { registerEnumType } from '@nestjs/graphql';

export enum UserProvider {
  KAKAO = 'kakao',
}

registerEnumType(UserProvider, { name: 'UserProvider', description: 'User provider like google, naver, kakao' });
