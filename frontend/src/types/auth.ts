export const ROLE = {
    USER: 'USER',
    ADMIN: 'ADMIN',
} as const;

export type Role = keyof typeof ROLE;

export interface IAuth {
    _id?: string;
    email: string;
    password: string;
    username?: string;
    isActivated?: boolean;
    roles?: Role[];
}

export interface User extends Omit<IAuth, '_id'> {
    id: string;
}

export interface IToken {
    refreshToken: string;
    accessToken: string;
}

export interface IAuthResponse extends IToken {
    userDto: IAuth;
}
