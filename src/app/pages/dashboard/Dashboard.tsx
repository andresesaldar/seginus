import React from 'react';
import { AppNavbar, MoleculesList } from '../../components';

export const Dashboard: React.FC = () => {
    // TODO Show Spotify implementations
    return (
        <div>
            <AppNavbar />
            <div className="container py-2">
                <MoleculesList />
            </div>
        </div>
    );
};
