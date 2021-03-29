import React, { useEffect, useState, WeakValidationMap } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dispatch } from 'redux';
import { AuthenticationActionTypes, authenticationThunks, RootActions, RootState } from '../../../../store';
import { AuthenticatedAppInfo } from '../../../../interfaces';
import { ROUTES } from '../../../../routes';

interface CheckSpotifyAuthenticationResultProps {
    authCode: string | null;
    authError: string | null;
    authState: string | null;
}

const CheckSpotifyAuthenticationResultPropTypes: WeakValidationMap<CheckSpotifyAuthenticationResultProps> = {
    authCode: PropTypes.string,
    authError: PropTypes.string,
    authState: PropTypes.string,
};

export const CheckSpotifyAuthenticationResult: React.FC<CheckSpotifyAuthenticationResultProps> = (props) => {
    const { authCode, authState, authError } = props;
    const dispatch: Dispatch<RootActions> = useDispatch();
    const history = useHistory();
    const isLoggedIn: boolean = useSelector<RootState, boolean>((state) => state.authentication.isLoggedIn);
    const authenticatedAppInfo: AuthenticatedAppInfo | null = useSelector<RootState, AuthenticatedAppInfo | null>(
        (state) => state.authentication.authenticatedAppInfo,
    );
    const spotifyAuthStateValidator: string | null = useSelector<RootState, string | null>(
        (state) => state.authentication.spotifyAuthStateValidator,
    );
    const [isValidStateValidator, setIsValidStateValidator] = useState<boolean>(true);
    useEffect(() => {
        if (spotifyAuthStateValidator) {
            const isValidStateValidator = !!authState && authState === spotifyAuthStateValidator;
            setIsValidStateValidator(isValidStateValidator);
        }
    }, [spotifyAuthStateValidator, authState]);
    useEffect(() => {
        if (isValidStateValidator && !!authCode) {
            dispatch(authenticationThunks.requestAuthorizationTokens(authCode) as any);
        }
    }, []);
    useEffect(() => {
        if (isLoggedIn) history.push(ROUTES.DASHBOARD);
    }, [isLoggedIn]);
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
    return (
        <div className="text-break">
            {authCode && (
                <div>
                    <span>Code: {authCode}</span>
                    <br />
                </div>
            )}
            {(authError || !isValidStateValidator) && (
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

CheckSpotifyAuthenticationResult.propTypes = CheckSpotifyAuthenticationResultPropTypes;
