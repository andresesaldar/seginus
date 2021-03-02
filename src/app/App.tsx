import React from 'react';
import './app.scss';

export const App: React.FC = () => {
    const title = 'Seginus';
    return (
        <div className="w-100 h-100 container py-3">
            <h1>{title}</h1>
        </div>
    );
};
