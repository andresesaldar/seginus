import { Action } from 'redux';

export enum AuthenticationActionTypes {
    AUTHENTICATION_SET_TOKEN = 'AUTHENTICATION_SET_TOKEN',
    AUTHENTICATION_ASYNC_SET_TOKEN = 'AUTHENTICATION_ASYNC_SET_TOKEN',
    AUTHENTICATION_ASYNC_SET_TOKEN_FULFILLED = 'AUTHENTICATION_ASYNC_SET_TOKEN/fulfilled',
    AUTHENTICATION_ASYNC_SET_TOKEN_PENDING = 'AUTHENTICATION_ASYNC_SET_TOKEN/pending',
    AUTHENTICATION_ASYNC_SET_TOKEN_REJECTED = 'AUTHENTICATION_ASYNC_SET_TOKEN/rejected',
}

export interface AuthenticationSetToken extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.AUTHENTICATION_SET_TOKEN;
    token: string;
}

export interface AuthenticationAsyncSetToken extends Action<AuthenticationActionTypes> {
    type:
        | AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_FULFILLED
        | AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_PENDING
        | AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN_REJECTED;
    payload: string;
}

export type AuthenticationActions = AuthenticationSetToken | AuthenticationAsyncSetToken;
