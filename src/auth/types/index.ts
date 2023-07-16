import { UserProvider } from 'src/graphql';

export type UserPayload = { email: string; name: string; provider: UserProvider };
