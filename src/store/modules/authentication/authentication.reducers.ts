import { combineReducers, Reducer } from 'redux';
import { AuthenticationState } from './authentication.state';
import {
    AuthenticationActions,
    AuthenticationActionTypes,
    AuthenticationAsyncSetToken,
    AuthenticationSetToken,
} from './authentication.actions';

const authenticationSetToken: Reducer<string | null, AuthenticationSetToken | AuthenticationAsyncSetToken> = (
    token,
    action,
) => {
    switch (action.type) {
        case AuthenticationActionTypes.AUTHENTICATION_SET_TOKEN:
            return action.token;
        case AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_FULFILLED:
            return action.payload;
        default:
            return token !== undefined ? token : null;
    }
};

const authenticationSetRequestingToken: Reducer<boolean, AuthenticationAsyncSetToken> = (value, action) => {
    switch (action.type) {
        case AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_PENDING:
            return true;
        case AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_FULFILLED:
            return false;
        case AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_REJECTED:
            return false;
        default:
            return value !== undefined ? value : false;
    }
};

export const authenticationReducer: Reducer<AuthenticationState, AuthenticationActions> = combineReducers({
    token: authenticationSetToken,
    requestingToken: authenticationSetRequestingToken,
});
