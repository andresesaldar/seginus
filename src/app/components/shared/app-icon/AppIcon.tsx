import React, { useEffect, useState, WeakValidationMap } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

interface AppIconProps {
    extraIconClass?: string;
}

const AppIconPropTypes: WeakValidationMap<AppIconProps> = {
    extraIconClass: PropTypes.string,
};

export const AppIcon: React.FC<AppIconProps> = (props) => {
    const { extraIconClass } = props;
    const initialIconClass = 'fas fa-bomb';
    const [iconClass, setIconClass] = useState<string>(initialIconClass);
    useEffect(() => {
        if (extraIconClass) setIconClass(`${initialIconClass} ${extraIconClass}`);
    }, [extraIconClass]);
    return <FontAwesomeIcon icon="bomb" className={iconClass} />;
};

AppIcon.propTypes = AppIconPropTypes;
