import { UserProvider } from '../enums/user-provider.enum';

export class CreateUserAuthInput {
  userId: string;
  provider: UserProvider;
}
