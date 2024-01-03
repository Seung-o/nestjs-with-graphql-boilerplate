import {User} from "../interfaces/user.interface";

export class UpdateUserDTO implements Partial<User>{
    name?: string;
    lastLoginTime?: Date;
    refreshToken?: string | null;
}