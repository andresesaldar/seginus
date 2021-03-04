import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckSpotifyAuthenticationResult } from '../../components/authentication/check-spotify-authentication-result/CheckSpotifyAuthenticationResult';
import { SpotifyAuthenticationInitializer } from '../../components/authentication/spotify-authentication-initializer/SpotifyAuthenticationInitializer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AuthenticatedAppInfo } from '../../../store/modules/authentication';

export const Authenticate: React.FC = () => {
    const { search } = useLocation();
    const authCode = new URLSearchParams(search).get('code');
    const authError = new URLSearchParams(search).get('error');
    const authenticatedAppInfo: AuthenticatedAppInfo | null = useSelector<RootState, AuthenticatedAppInfo | null>(
        (state) => state.authentication.authenticatedAppInfo,
    );
    return (
        <div>
            {(authCode || authError) &&
            authenticatedAppInfo &&
            authenticatedAppInfo.clientId &&
            authenticatedAppInfo.clientSecret ? (
                <CheckSpotifyAuthenticationResult />
            ) : (
                <SpotifyAuthenticationInitializer />
            )}
        </div>
    );
};
