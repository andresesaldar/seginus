import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Authenticate } from './pages/authenticate/Authenticate';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const App: React.FC = () => {
    const isLoggedIn = useSelector<RootState, boolean>((state) => state.authentication.isLoggedIn);
    return (
        <div className="container py-3">
            <h1>Seginus</h1>
            <p>Spotify&apos;s integration WebApp made With React</p>
            <BrowserRouter>
                <Switch>
                    {isLoggedIn ? (
                        <Route exact path="/">
                            <div>Hola prro</div>
                        </Route>
                    ) : (
                        <Route exact path="/authenticate">
                            <Authenticate />
                        </Route>
                    )}
                    <Redirect from="*" to={isLoggedIn ? '/' : '/authenticate'} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};
