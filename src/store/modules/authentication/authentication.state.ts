import { environment } from '../../../environments';
import { AuthenticatedAppInfo } from '../../../interfaces';

const authenticatedAppInfoFromLocalStorage = (): AuthenticatedAppInfo | null => {
    const authenticatedAppClientIdKey = localStorage.getItem(environment.localStorageAuthenticatedAppClientIdKey);
    const authenticatedAppClientSecretKey = localStorage.getItem(
        environment.localStorageAuthenticatedAppClientSecretKey,
    );
    return authenticatedAppClientIdKey && authenticatedAppClientSecretKey
        ? {
              clientId: authenticatedAppClientIdKey,
              clientSecret: authenticatedAppClientSecretKey,
          }
        : null;
};

export interface AuthenticationState {
    authenticatedAppInfo: AuthenticatedAppInfo | null;
    requestingUserAuthentication: boolean;
    isLoggedIn: boolean;
    spotifyAuthStateValidator: string | null;
}

export const initialAuthenticationState: AuthenticationState = {
    authenticatedAppInfo: authenticatedAppInfoFromLocalStorage(),
    requestingUserAuthentication: false,
    isLoggedIn: false,
    spotifyAuthStateValidator: localStorage.getItem(environment.localStorageSpotifyAuthStateKey) || null,
};
