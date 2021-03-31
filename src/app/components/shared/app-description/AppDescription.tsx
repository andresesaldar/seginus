import React from 'react';
import { AppInfo } from '../../../../enums';
import { AppIcon } from '../app-icon/AppIcon';

export const AppDescription: React.FC = () => {
    return (
        <div>
            <h1>
                <AppIcon extraIconClass="mr-2" />
                <span>{AppInfo.APP_NAME}</span>
            </h1>
            <p>Spotify&apos;s integration WebApp made With React</p>
        </div>
    );
};
