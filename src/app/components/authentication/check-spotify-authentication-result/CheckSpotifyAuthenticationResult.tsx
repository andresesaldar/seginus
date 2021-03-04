import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootActions, RootState } from '../../../../store';
import { AuthenticatedAppInfo, AuthenticationActionTypes } from '../../../../store/modules/authentication';
import { Dispatch } from 'redux';

export const CheckSpotifyAuthenticationResult: React.FC = () => {
    const retryAuthWithSameCredentials = (event: Event) => {
        event.preventDefault();
        if (authenticatedAppInfo) {
            dispatch({
                type: AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION,
                clientId: authenticatedAppInfo.clientId,
                clientSecret: authenticatedAppInfo.clientSecret,
                state: spotifyAuthStateValidator || undefined,
            });
        }
    };
    const { search } = useLocation();
    const authCode = new URLSearchParams(search).get('code');
    const authState = new URLSearchParams(search).get('state');
    const authError = new URLSearchParams(search).get('error');
    const dispatch: Dispatch<RootActions> = useDispatch();
    const authenticatedAppInfo: AuthenticatedAppInfo | null = useSelector<RootState, AuthenticatedAppInfo | null>(
        (state) => state.authentication.authenticatedAppInfo,
    );
    const spotifyAuthStateValidator: string | null = useSelector<RootState, string | null>(
        (state) => state.authentication.spotifyAuthStateValidator,
    );
    const [isValidStateValidator, setIsValidStateValidator] = useState<boolean>(true);
    useEffect(() => {
        spotifyAuthStateValidator
            ? authState && authState === spotifyAuthStateValidator
                ? setIsValidStateValidator(true)
                : setIsValidStateValidator(false)
            : setIsValidStateValidator(true);
    });
    return (
        <div className="text-break">
            {authCode && (
                <div>
                    <span>Code: {authCode}</span>
                    <br />
                </div>
            )}
            {authError && (
                <div>
                    <span className="text-danger">
                        Ups! Authentication failed:{' '}
                        {isValidStateValidator ? authError : 'Invalid validation state parameter'}
                    </span>
                    <br />
                    You can try:&nbsp;
                    <Link to="/authentication">Back to auth home</Link>
                    <br />
                    {isValidStateValidator && (
                        <div>
                            or:&nbsp;
                            <a href="#" onClick={retryAuthWithSameCredentials as any}>
                                Retry Auth with same credentials
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
