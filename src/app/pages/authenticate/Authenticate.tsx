import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppDescription, CheckSpotifyAuthenticationResult, SpotifyAuthenticationInitializer } from '../../components';
import { AuthenticatedAppInfo } from '../../../interfaces';
import { RootState } from '../../../store';

export const Authenticate: React.FC = () => {
    const { search } = useLocation();
    const history = useHistory();
    const authenticatedAppInfo: AuthenticatedAppInfo | null = useSelector<RootState, AuthenticatedAppInfo | null>(
        (state) => state.authentication.authenticatedAppInfo,
    );
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authState, setAuthState] = useState<string | null>(null);
    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        setAuthCode(searchParams.get('code'));
        setAuthError(searchParams.get('error'));
        setAuthState(searchParams.get('state'));
        history.replace({ search: undefined });
    }, []);
    return (
        <div className="container py-2">
            <AppDescription />
            {(authCode || authError) &&
            authenticatedAppInfo &&
            authenticatedAppInfo.clientId &&
            authenticatedAppInfo.clientSecret ? (
                <CheckSpotifyAuthenticationResult authCode={authCode} authError={authError} authState={authState} />
            ) : (
                <SpotifyAuthenticationInitializer />
            )}
        </div>
    );
};
