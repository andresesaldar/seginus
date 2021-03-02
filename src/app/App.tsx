import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SetTokenForm } from './components/authentication/set-token-form/SetTokenForm';

export const App: React.FC = () => {
    const token: string | null = useSelector<RootState, string | null>((state) => state.authentication.token);
    const requestingToken: boolean = useSelector<RootState, boolean>((state) => state.authentication.requestingToken);
    return (
        <div className="container py-3">
            <h1>Hello World</h1>
            <p>No idea of what to do</p>
            {token || requestingToken ? (
                <span>
                    The token:&nbsp;
                    {!requestingToken ? <span>{token}</span> : <span className="badge bg-info">Requesting token</span>}
                </span>
            ) : (
                <span className="badge bg-danger">No Token</span>
            )}
            <div className="pt-2">
                <SetTokenForm />
            </div>
        </div>
    );
};
