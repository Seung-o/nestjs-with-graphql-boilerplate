import {JwtAuth} from "../interfaces/auth.interface";
import {User} from "../../users/interfaces/user.interface";

export class AuthenticatedUser implements JwtAuth, User{

    constructor(partial: Partial<AuthenticatedUser>) {
        Object.assign(this, partial);
    }

    id: string;
    email: string;
    name: string;
    lastLoginTime: Date;
    accessToken: string;
    refreshToken: string;
}