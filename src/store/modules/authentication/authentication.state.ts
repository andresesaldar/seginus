import { environment } from '../../../environments';
import { AuthenticatedAppInfo, AuthenticationTokenInfo } from '../../../interfaces';
import { authenticatedAppInfoFromLS, tokenInfoFromLS } from './authentication.getters';

export interface AuthenticationState {
    authenticatedAppInfo: AuthenticatedAppInfo | null;
    requestingUserAuthentication: boolean;
    isLoggedIn: boolean;
    spotifyAuthStateValidator: string | null;
    tokenInfo: AuthenticationTokenInfo | null;
}

export const initialAuthenticationState: AuthenticationState = {
    authenticatedAppInfo: authenticatedAppInfoFromLS(),
    requestingUserAuthentication: false,
    isLoggedIn: !!tokenInfoFromLS(),
    spotifyAuthStateValidator: localStorage.getItem(environment.LSSpotifyAuthStateKey) || null,
    tokenInfo: tokenInfoFromLS(),
};
