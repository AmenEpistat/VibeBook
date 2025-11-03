export interface IAuth {
    id?: string;
    email: string;
    password: string | null;
    username?: string;
    isActivated?: boolean;
}

export interface IToken {
    refreshToken: string;
    accessToken: string;
}

export interface IAuthResponse extends IToken {
    user: IAuth;
}
