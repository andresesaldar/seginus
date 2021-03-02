export interface AuthenticationState {
    token: string | null;
    requestingToken: boolean;
}

export const initialAuthenticationState: AuthenticationState = {
    token: null,
    requestingToken: false,
};
