import React, { useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../routes';
import { AppInfo } from '../../../../enums';
import { AuthenticationActionTypes, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';

export const AppNavbar: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = useSelector<RootState, boolean>((state) => state.authentication.isLoggedIn);
    const doLogout = () => {
        dispatch({
            type: AuthenticationActionTypes.LOGOUT,
        });
    };
    useEffect(() => {
        if (!isLoggedIn) history.push(ROUTES.AUTHENTICATE);
    }, [isLoggedIn]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={ROUTES.DASHBOARD}>
                    {AppInfo.APP_NAME}
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to={ROUTES.DASHBOARD}>
                                Dashboard
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {isLoggedIn && (
                    <button className="d-flex btn btn-sm btn-danger" onClick={doLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};
