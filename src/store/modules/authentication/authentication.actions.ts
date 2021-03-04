import { Action } from 'redux';

export enum AuthenticationActionTypes {
    REQUEST_USER_AUTHORIZATION = 'REQUEST_USER_AUTHORIZATION',
    REMOVE_AUTH_STATE_VALIDATOR = 'REMOVE_AUTH_STATE_VALIDATOR',
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

export type AuthenticationActions = RequestUserAuthorizationAction | RemoveAuthStateValidatorAction;
