import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticationActionTypes } from './authentication.actions';
import { ajax } from 'rxjs/ajax';
import { environment } from '../../../environments';
import { authenticationAuthorization } from './authentication.getters';
import { GetTokensResponse } from '../../../interfaces/integration/spotify/get-tokens-response';

interface AuthenticationThunks {
    requestAuthorizationTokens: AsyncThunk<GetTokensResponse, string, any>;
}

const { baseSpotifyAuthenticationUrl, whenSpotifyAuthenticationSuccessRedirectUri } = environment;

const requestAuthorizationTokens: AsyncThunk<GetTokensResponse, string, any> = createAsyncThunk(
    AuthenticationActionTypes.REQUEST_AUTHORIZATION_TOKENS,
    (code): Promise<GetTokensResponse> => {
        return ajax
            .post(
                `${baseSpotifyAuthenticationUrl}/api/token`,
                {
                    // TODO Pass this as a constant
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: whenSpotifyAuthenticationSuccessRedirectUri,
                },
                {
                    Authorization: authenticationAuthorization(),
                },
            )
            .toPromise()
            .then((integrationRes) => integrationRes.response);
    },
);

export const authenticationThunks: AuthenticationThunks = {
    requestAuthorizationTokens,
};
