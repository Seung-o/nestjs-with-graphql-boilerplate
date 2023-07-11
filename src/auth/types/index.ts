import { UserProvider } from 'src/graphql';

export type SocialCallbackInput = { email: string; name: string; provider: UserProvider };
