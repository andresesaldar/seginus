import React, { FormEvent, useState } from 'react';
import { Dispatch } from 'redux';
import { RootActions, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationActionTypes, authenticationThunks } from '../../../../store/modules/authentication';

export const SetTokenForm: React.FC = () => {
    const dispatch: Dispatch<RootActions> = useDispatch();
    const tokenInput = React.createRef<HTMLInputElement>();
    const requestingToken: boolean = useSelector<RootState, boolean>((state) => state.authentication.requestingToken);
    const [useTokenWithDelay, setTokenWithDelay] = useState(true);
    const setToken = (event: FormEvent) => {
        event.preventDefault();
        if (tokenInput.current?.value) {
            if (useTokenWithDelay) {
                dispatch(authenticationThunks.authenticationSetTokenWithDelayThunk(tokenInput.current?.value) as any);
            } else {
                dispatch({
                    type: AuthenticationActionTypes.AUTHENTICATION_SET_TOKEN,
                    token: tokenInput.current?.value,
                });
            }
        }
    };
    return (
        <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={setToken}>
            <div className="col-12">
                <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">
                    Token
                </label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroupUsername"
                        placeholder="Token"
                        ref={tokenInput}
                    />
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={requestingToken}>
                    Set token
                </button>
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineFormCheck"
                        checked={useTokenWithDelay}
                        onChange={() => setTokenWithDelay(!useTokenWithDelay)}
                    />
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                        With Delay
                    </label>
                </div>
            </div>
        </form>
    );
};
