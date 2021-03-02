import { Store, Reducer, combineReducers } from 'redux';
import {
    AuthenticationActions,
    authenticationReducer,
    AuthenticationState,
    initialAuthenticationState,
} from './modules/authentication';
import { configureStore } from '@reduxjs/toolkit';

const initialRootState: RootState = {
    authentication: initialAuthenticationState,
};

const rootReducer: Reducer<RootState, RootActions> = combineReducers({
    authentication: authenticationReducer,
});

export interface RootState {
    authentication: AuthenticationState;
}

export type RootActions = AuthenticationActions;

export const store: Store<RootState, RootActions> = configureStore({
    reducer: rootReducer,
    preloadedState: initialRootState,
});
