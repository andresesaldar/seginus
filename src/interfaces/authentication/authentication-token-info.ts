export interface AuthenticationTokenInfo {
    accessToken: string;
    tokenType: string;
    scope?: string;
    expiresIn: string;
    refreshToken: string;
}
