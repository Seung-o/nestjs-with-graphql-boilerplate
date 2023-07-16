
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserProvider {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE"
}

export class SocialSignupInput {
    accessToken: string;
}

export class CreateCatInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateUserInput {
    email: string;
    name: string;
    provider: UserProvider;
}

export class CreateUserAuthInput {
    userId: string;
    provider: UserProvider;
}

export abstract class IMutation {
    abstract socialSignup(input: SocialSignupInput): User | Promise<User>;

    abstract createCat(createCatInput?: Nullable<CreateCatInput>): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export abstract class IQuery {
    abstract googleAuth(): string | Promise<string>;

    abstract cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;

    abstract cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export abstract class ISubscription {
    abstract catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export class Owner {
    id: number;
    name: string;
    age?: Nullable<number>;
    cats?: Nullable<Cat[]>;
}

export class Cat {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    owner?: Nullable<Owner>;
}

export class UserAuth {
    id: string;
    user: User;
    provider: UserProvider;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    id: string;
    email: string;
    name: string;
    lastLoginTime: string;
    auths: UserAuth[];
    createdAt: Date;
    updatedAt: Date;
}

type Nullable<T> = T | null;
