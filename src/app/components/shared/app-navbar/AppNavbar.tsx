import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'bootstrap';
import { AuthenticationActionTypes, RootState } from '../../../../store';
import { ROUTES } from '../../../../routes';
import { AppInfo } from '../../../../enums';
import { AppTooltip } from '../app-tooltip/AppTooltip';
import { AppIcon } from '../app-icon/AppIcon';
import './AppNavbar.scss';

const logoutBtnId = 'navbarLogoutBtn';

const logoutBtnTooltipOptions: Partial<Tooltip.Options> = {
    trigger: 'hover',
    placement: 'bottom',
    title: 'Logout',
};

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
            <div className="container">
                <Link className="navbar-brand app-navbar-brand" to={ROUTES.DASHBOARD}>
                    <AppIcon extraIconClass="mr-2 text-warning" />
                    <span className="app-navbar-brand-label">{AppInfo.APP_NAME}</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" />
                    <button className="btn btn-outline-light" type="button" onClick={doLogout} id={logoutBtnId}>
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </button>
                    <AppTooltip sourceElementId={logoutBtnId} tooltipOptions={logoutBtnTooltipOptions} />
                </div>
            </div>
        </nav>
    );
};
