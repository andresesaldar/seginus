import { combineReducers, Reducer } from 'redux';
import { AuthenticationState } from './authentication.state';
import {
    AuthenticationActions,
    AuthenticationActionTypes,
    RequestUserAuthorizationAction,
} from './authentication.actions';
import { environment } from '../../../environments';
import { AuthenticatedAppInfo, AuthenticationTokenInfo } from '../../../interfaces';

const {
    baseSpotifyAuthenticationUrl,
    whenSpotifyAuthenticationSuccessRedirectUri,
    LSAuthenticatedAppClientIdKey,
    LSAuthenticatedAppClientSecretKey,
    LSSpotifyAuthStateKey,
    LSSpotifyAuthTokenInfo,
} = environment;

const setAuthenticatedAppInfo: Reducer<AuthenticatedAppInfo | null, AuthenticationActions> = (
    authenticatedAppInfo,
    action,
) => {
    const { clientId, clientSecret, state } = action as RequestUserAuthorizationAction;
    switch (action.type) {
        case AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION:
            localStorage.setItem(LSAuthenticatedAppClientIdKey, clientId);
            localStorage.setItem(LSAuthenticatedAppClientSecretKey, clientSecret);
            // TODO Pass the response type as a  constant
            let spotifyUrl = `${baseSpotifyAuthenticationUrl}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${whenSpotifyAuthenticationSuccessRedirectUri}`;
            if (state) spotifyUrl += `&state=${state}`;
            window.open(spotifyUrl, '_self');
            return {
                clientId,
                clientSecret,
            };
        case AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_FULFILLED:
            return null;
        default:
            return authenticatedAppInfo !== undefined ? authenticatedAppInfo : null;
    }
};

const setRequestingUserAuthentication: Reducer<boolean, AuthenticationActions> = (
    requestingUserAuthentication,
    action,
) => {
    switch (action.type) {
        case AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION:
            return true;
        default:
            return requestingUserAuthentication !== undefined ? requestingUserAuthentication : false;
    }
};

const setSpotifyAuthStateValidator: Reducer<string | null, AuthenticationActions> = (
    spotifyAuthStateValidator,
    action,
) => {
    switch (action.type) {
        case AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_FULFILLED:
            return null;
        case AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION:
            if (action.state) {
                localStorage.setItem(environment.LSSpotifyAuthStateKey, action.state);
                return action.state;
            } else {
                localStorage.removeItem(environment.LSSpotifyAuthStateKey);
                return null;
            }
        case AuthenticationActionTypes.REMOVE_AUTH_STATE_VALIDATOR:
            localStorage.removeItem(environment.LSSpotifyAuthStateKey);
            return null;
        default:
            return spotifyAuthStateValidator !== undefined ? spotifyAuthStateValidator : null;
    }
};

const setIsLoggedIn: Reducer<boolean, AuthenticationActions> = (isLoggedIn, { type }) => {
    switch (type) {
        case AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_FULFILLED:
            localStorage.removeItem(LSAuthenticatedAppClientSecretKey);
            localStorage.removeItem(LSAuthenticatedAppClientIdKey);
            localStorage.removeItem(LSSpotifyAuthStateKey);
            return true;
        case AuthenticationActionTypes.LOGOUT:
            return false;
        default:
            return isLoggedIn !== undefined ? isLoggedIn : false;
    }
};

const setTokenInfo: Reducer<AuthenticationTokenInfo | null, AuthenticationActions> = (tokenInfo, action) => {
    switch (action.type) {
        // TODO Check when is pending
        case AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_FULFILLED:
            const newTokenInfo: AuthenticationTokenInfo = {
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                expiresIn: action.payload.expires_in,
                tokenType: action.payload.token_type,
                scope: action.payload.scope,
            };
            localStorage.setItem(LSSpotifyAuthTokenInfo, btoa(JSON.stringify(newTokenInfo)));
            return newTokenInfo;
        case AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_REJECTED:
            // TODO Check if fail
            localStorage.removeItem(LSSpotifyAuthTokenInfo);
            return null;
        case AuthenticationActionTypes.LOGOUT:
            localStorage.removeItem(LSSpotifyAuthTokenInfo);
            return null;
        default:
            return tokenInfo !== undefined ? tokenInfo : null;
    }
};

export const authenticationReducer: Reducer<AuthenticationState, AuthenticationActions> = combineReducers({
    authenticatedAppInfo: setAuthenticatedAppInfo,
    requestingUserAuthentication: setRequestingUserAuthentication,
    isLoggedIn: setIsLoggedIn,
    spotifyAuthStateValidator: setSpotifyAuthStateValidator,
    tokenInfo: setTokenInfo,
});
