import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticationActionTypes } from './authentication.actions';
import { ajax } from 'rxjs/ajax';
import { environment } from '../../../environments';

interface AuthenticationThunks {
    requestUserAuthorization: AsyncThunk<string, string, any>;
}

const requestUserAuthorization: AsyncThunk<string, string, any> = createAsyncThunk(
    AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION,
    (clientId): Promise<string> => {
        const { baseSpotifyAuthenticationUrl, whenSpotifyAuthenticationSuccessRedirectUri } = environment;
        return ajax
            .get(
                `${baseSpotifyAuthenticationUrl}/authorize?client_id=${clientId}&response_type=token&redirect_uri=${whenSpotifyAuthenticationSuccessRedirectUri}`,
            )
            .toPromise()
            .then((response) => JSON.stringify(response));
    },
);

export const authenticationThunks: AuthenticationThunks = {
    requestUserAuthorization,
};
