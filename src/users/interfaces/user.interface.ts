export interface User {
  id: string;
  email: string;
  name: string;
  lastLoginTime: Date;
  refreshToken?: string | null;
}
