import React, { useEffect, WeakValidationMap } from 'react';
import { Popover } from 'bootstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

interface AppPopoverProps {
    sourceElementId: string;
    popoverOptions?: Partial<Popover.Options>;
    onShowedPopover?: () => void;
}

const AppPopoverPropTypes: WeakValidationMap<AppPopoverProps> = {
    sourceElementId: PropTypes.string.isRequired,
    popoverOptions: PropTypes.any,
};

export const AppPopover: React.FC<AppPopoverProps> = (props) => {
    const { sourceElementId, popoverOptions, onShowedPopover } = props;
    let popoverElement: JQuery<HTMLButtonElement> | null = null;
    useEffect(() => {
        popoverElement = $(`#${sourceElementId}`);
        if (onShowedPopover) popoverElement.on('shown.bs.tooltip', () => setTimeout(() => onShowedPopover(), 500));
        popoverElement.popover(popoverOptions);
        return () => {
            if (!!popoverElement) {
                popoverElement.off('shown.bs.tooltip');
                popoverElement.popover('dispose');
                popoverElement = null;
            }
        };
    }, [sourceElementId, popoverOptions]);
    return null;
};

AppPopover.propTypes = AppPopoverPropTypes;
