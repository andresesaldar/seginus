import React from 'react';
import { AppNavbar } from '../../components';

export const Dashboard: React.FC = () => {
    // TODO Show Spotify implementations
    return (
        <div>
            <AppNavbar />
            <div className="container py-2">
                <h2>Welcome to your dashboard</h2>
            </div>
        </div>
    );
};
