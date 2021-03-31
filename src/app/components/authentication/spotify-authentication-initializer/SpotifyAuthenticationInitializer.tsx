import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RootActions, RootState, AuthenticationActionTypes } from '../../../../store';
import { AuthenticatedAppInfo } from '../../../../interfaces';

export const SpotifyAuthenticationInitializer: React.FC = () => {
    const dispatch: Dispatch<RootActions> = useDispatch();
    const authenticatedAppInfo: AuthenticatedAppInfo | null = useSelector<RootState, AuthenticatedAppInfo | null>(
        (state) => state.authentication.authenticatedAppInfo,
    );
    const spotifyAuthStateValidator: string | null = useSelector<RootState, string | null>(
        (state) => state.authentication.spotifyAuthStateValidator,
    );
    const requestingUserAuthentication: boolean = useSelector<RootState, boolean>(
        (state) => state.authentication.requestingUserAuthentication,
    );
    const [temporalClientIdValue, setTemporalClientIdValue] = useState<string>(
        authenticatedAppInfo ? authenticatedAppInfo.clientId : '',
    );
    const [temporalClientSecretValue, setTemporalClientSecretValue] = useState<string>(
        authenticatedAppInfo ? authenticatedAppInfo.clientSecret : '',
    );
    const [useAuthState, setUseAuthState] = useState<boolean>(!!spotifyAuthStateValidator);
    const [authState, setAuthState] = useState<string>(spotifyAuthStateValidator || '');
    useEffect(() => {
        if (!useAuthState) {
            dispatch({
                type: AuthenticationActionTypes.REMOVE_AUTH_STATE_VALIDATOR,
            });
        }
    }, [useAuthState]);
    const initializeAuthentication = (event: FormEvent) => {
        if (event) event.preventDefault();
        if (
            temporalClientIdValue.trim().length > 0 &&
            temporalClientSecretValue.trim().length > 0 &&
            ((useAuthState && authState.trim().length > 0) || !useAuthState)
        ) {
            dispatch({
                type: AuthenticationActionTypes.REQUEST_USER_AUTHORIZATION,
                clientId: temporalClientIdValue,
                clientSecret: temporalClientSecretValue,
                state: useAuthState && authState ? authState : undefined,
            });
        }
    };
    return (
        <div>
            {requestingUserAuthentication && <span className="badge badge-info mb-2">Requesting authentication</span>}
            <form onSubmit={initializeAuthentication}>
                <div className="mb-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="clientId"
                            required
                            placeholder="Client ID"
                            value={temporalClientIdValue}
                            onChange={(event) => setTemporalClientIdValue(event.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="clientSecret"
                            required
                            placeholder="Client Secret"
                            value={temporalClientSecretValue}
                            onChange={(event) => setTemporalClientSecretValue(event.target.value)}
                        />
                    </div>
                </div>
                {useAuthState && (
                    <div className="mb-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="authState"
                                required
                                placeholder="Auth state"
                                value={authState}
                                onChange={(event) => setAuthState(event.target.value)}
                            />
                        </div>
                    </div>
                )}
                <div className="mb-2 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="useAuthStateCheck"
                        checked={useAuthState}
                        onChange={(event) => setUseAuthState(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="useAuthStateCheck">
                        Use Auth state
                    </label>
                </div>
                <div className="mb-2">
                    <button type="submit" className="btn btn-primary" disabled={requestingUserAuthentication}>
                        Set Client ID
                    </button>
                </div>
            </form>
        </div>
    );
};
