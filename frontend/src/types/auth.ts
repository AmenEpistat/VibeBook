export const ROLE = {
    user: 'user',
    admin: 'admin',
} as const;

export type Role = keyof typeof ROLE;

export interface IAuth {
    id?: string;
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
