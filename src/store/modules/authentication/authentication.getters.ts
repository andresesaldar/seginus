import { AuthenticationState, store } from '../../index';
import { AuthenticatedAppInfo, AuthenticationTokenInfo } from '../../../interfaces';
import { environment } from '../../../environments';

const { LSAuthenticatedAppClientIdKey, LSAuthenticatedAppClientSecretKey, LSSpotifyAuthTokenInfoKey } = environment;

export const actualAuthenticationState = (): AuthenticationState => store.getState().authentication;

export const authenticationAuthorization = (): string => {
    const { clientSecret, clientId } = actualAuthenticationState().authenticatedAppInfo || {};
    return `Basic ${btoa(`${clientId || ''}:${clientSecret || ''}`)}`;
};

export const authenticatedAppInfoFromLS = (): AuthenticatedAppInfo | null => {
    const authenticatedAppClientIdKey = localStorage.getItem(LSAuthenticatedAppClientIdKey);
    const authenticatedAppClientSecretKey = localStorage.getItem(LSAuthenticatedAppClientSecretKey);
    return authenticatedAppClientIdKey && authenticatedAppClientSecretKey
        ? {
              clientId: authenticatedAppClientIdKey,
              clientSecret: authenticatedAppClientSecretKey,
          }
        : null;
};

export const tokenInfoFromLS = (): AuthenticationTokenInfo | null => {
    const authTokenInfo = localStorage.getItem(LSSpotifyAuthTokenInfoKey);
    return authTokenInfo ? JSON.parse(atob(authTokenInfo)) : null;
};
