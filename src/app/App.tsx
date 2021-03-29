import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from '../store';
import { Authenticate, Dashboard } from './pages';
import { ROUTES } from '../routes';

export const App: React.FC = () => {
    const isLoggedIn = useSelector<RootState, boolean>((state) => state.authentication.isLoggedIn);
    return (
        <BrowserRouter>
            <Switch>
                {isLoggedIn ? (
                    <Route exact path={ROUTES.DASHBOARD}>
                        <Dashboard />
                    </Route>
                ) : (
                    <Route exact path={ROUTES.AUTHENTICATE}>
                        <Authenticate />
                    </Route>
                )}
                <Redirect from="*" to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.AUTHENTICATE} />
            </Switch>
        </BrowserRouter>
    );
};
