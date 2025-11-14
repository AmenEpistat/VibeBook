export interface IAuth {
    id?: string;
    email: string;
    password: string;
    username?: string;
    isActivated?: boolean;
}

export interface IToken {
    refreshToken: string;
    accessToken: string;
}

export interface IAuthResponse extends IToken {
    userDto: IAuth;
}
