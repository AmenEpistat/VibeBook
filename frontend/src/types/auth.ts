export const ROLE = {
    USER: 'user',
    ADMIN: 'admin',
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

export interface IToken {
    refreshToken: string;
    accessToken: string;
}

export interface IAuthResponse extends IToken {
    userDto: IAuth;
}
