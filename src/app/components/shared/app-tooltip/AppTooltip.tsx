import React, { useEffect, WeakValidationMap } from 'react';
import { Tooltip } from 'bootstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';

interface AppTooltipProps {
    sourceElementId: string;
    tooltipOptions?: Partial<Tooltip.Options>;
}

const AppTooltipPropTypes: WeakValidationMap<AppTooltipProps> = {
    sourceElementId: PropTypes.string.isRequired,
    tooltipOptions: PropTypes.any,
};

export const AppTooltip: React.FC<AppTooltipProps> = (props) => {
    const { sourceElementId, tooltipOptions } = props;
    let tooltipElement: JQuery<HTMLButtonElement> | null = null;
    useEffect(() => {
        tooltipElement = $(`#${sourceElementId}`);
        tooltipElement.tooltip(tooltipOptions);
        return () => {
            if (!!tooltipElement) {
                tooltipElement.tooltip('dispose');
                tooltipElement = null;
            }
        };
    }, [sourceElementId, tooltipOptions]);
    return null;
};

AppTooltip.propTypes = AppTooltipPropTypes;
