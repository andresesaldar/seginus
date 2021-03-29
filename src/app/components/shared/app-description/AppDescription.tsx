import React from 'react';
import { AppInfo } from '../../../../enums';

export const AppDescription: React.FC = () => {
    return (
        <div>
            <h1>{AppInfo.APP_NAME}</h1>
            <p>Spotify&apos;s integration WebApp made With React</p>
        </div>
    );
};
