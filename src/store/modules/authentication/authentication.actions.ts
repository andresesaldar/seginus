import { Action } from 'redux';
import { GetTokensResponse } from '../../../interfaces/integration/spotify/get-tokens-response';

export enum AuthenticationActionTypes {
    REQUEST_USER_AUTHORIZATION = 'REQUEST_USER_AUTHORIZATION',
    REMOVE_AUTH_STATE_VALIDATOR = 'REMOVE_AUTH_STATE_VALIDATOR',
    REQUEST_AUTHORIZATION_TOKENS = 'REQUEST_AUTHORIZATION_TOKENS',
    REQUEST_AUTHORIZATION_TOKENS_FULFILLED = 'REQUEST_AUTHORIZATION_TOKENS/fulfilled',
    REQUEST_AUTHORIZATION_TOKENS_REJECTED = 'REQUEST_AUTHORIZATION_TOKENS/rejected',
    LOGOUT = 'LOGOUT',
}

export interface RequestUserAuthorizationAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION;
    clientId: string;
    clientSecret: string;
    state?: string;
}

export interface RemoveAuthStateValidatorAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.REMOVE_AUTH_STATE_VALIDATOR;
}

export interface RequestAuthorizationTokensAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS;
    code: string;
}

export interface RequestAuthorizationTokensFulfilledAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_FULFILLED;
    payload: GetTokensResponse;
}

export interface RequestAuthorizationTokensRejectedAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS_REJECTED;
}

export interface LogoutAction extends Action<AuthenticationActionTypes> {
    type: AuthenticationActionTypes.LOGOUT;
}

export type AuthenticationActions =
    | RequestUserAuthorizationAction
    | RemoveAuthStateValidatorAction
    | RequestAuthorizationTokensAction
    | RequestAuthorizationTokensFulfilledAction
    | RequestAuthorizationTokensRejectedAction
    | LogoutAction;
