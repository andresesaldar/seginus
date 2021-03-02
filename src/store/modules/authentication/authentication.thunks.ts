import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticationActionTypes } from './authentication.actions';

interface AuthenticationThunks {
    authenticationSetTokenWithDelayThunk: AsyncThunk<string, string, any>;
}

const authenticationSetTokenWithDelayThunk: AsyncThunk<string, string, any> = createAsyncThunk(
    AuthenticationActionTypes.AUTHENTICATION_ASYNC_SET_TOKEN,
    (token): Promise<string> => {
        return new Promise<string>((resolve) => {
            setTimeout(() => resolve(`${token}_WITH_DELAY`), 3000);
        });
    },
);

export const authenticationThunks: AuthenticationThunks = {
    authenticationSetTokenWithDelayThunk,
};
