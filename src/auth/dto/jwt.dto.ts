import {JwtAuth} from "../interfaces/auth.interface";

export class JwtToken implements JwtAuth {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export class JwtPayload {
  userId: string;
}