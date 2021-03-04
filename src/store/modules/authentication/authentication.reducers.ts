import { combineReducers, Reducer } from 'redux';
import { AuthenticatedAppInfo, AuthenticationState } from './authentication.state';
import {
    AuthenticationActions,
    AuthenticationActionTypes,
    RequestUserAuthorizationAction,
} from './authentication.actions';
import { environment } from '../../../environments';

const setAuthenticatedAppInfo: Reducer<AuthenticatedAppInfo | null, AuthenticationActions> = (
    authenticatedAppInfo,
    action,
) => {
    const { clientId, clientSecret, state } = action as RequestUserAuthorizationAction;
    switch (action.type) {
        case AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION:
            localStorage.setItem(environment.localStorageAuthenticatedAppClientIdKey, clientId);
            localStorage.setItem(environment.localStorageAuthenticatedAppClientSecretKey, clientSecret);
            const { baseSpotifyAuthenticationUrl, whenSpotifyAuthenticationSuccessRedirectUri } = environment;
            let spotifyUrl = `${baseSpotifyAuthenticationUrl}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${whenSpotifyAuthenticationSuccessRedirectUri}`;
            if (state) spotifyUrl += `&state=${state}`;
            window.open(spotifyUrl, '_self');
            return {
                clientId,
                clientSecret,
            };
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
        case AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION:
            if (action.state) {
                localStorage.setItem(environment.localStorageSpotifyAuthStateKey, action.state);
                return action.state;
            } else {
                localStorage.removeItem(environment.localStorageSpotifyAuthStateKey);
                return null;
            }
        case AuthenticationActionTypes.REMOVE_AUTH_STATE_VALIDATOR:
            localStorage.removeItem(environment.localStorageSpotifyAuthStateKey);
            return null;
        default:
            return spotifyAuthStateValidator !== undefined ? spotifyAuthStateValidator : null;
    }
};

const setIsLoggedIn: Reducer<boolean, AuthenticationActions> = (isLoggedIn) => {
    return isLoggedIn !== undefined ? isLoggedIn : false;
};

export const authenticationReducer: Reducer<AuthenticationState, AuthenticationActions> = combineReducers({
    authenticatedAppInfo: setAuthenticatedAppInfo,
    requestingUserAuthentication: setRequestingUserAuthentication,
    isLoggedIn: setIsLoggedIn,
    spotifyAuthStateValidator: setSpotifyAuthStateValidator,
});
