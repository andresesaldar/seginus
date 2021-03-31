import React from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppPopover, AppTooltip } from '../../../shared';
import { environment } from '../../../../../environments';
import './MoleculesListTitle.scss';

const { spotifyPageUri } = environment;

const moleculesExplanationBtnId = 'moleculesExplanationBtn';

const moleculesExplanationSpotifyIconId = 'moleculesExplanationSpotifyIcon';

const moleculesExplanationBtnPopoverOptions: Partial<Popover.Options> = {
    trigger: 'focus',
    placement: 'left',
    title: '¿What are molecules?',
    content: `<ul><li>Something cool.</li><li><u><b>Spotify features that you can use.</b></u>&nbsp;<span id=${moleculesExplanationSpotifyIconId}></li></ul>`,
    html: true,
};

const moleculesExplanationBtnTooltipOptions: Partial<Tooltip.Options> = {
    trigger: 'hover',
    placement: 'bottom',
    title: '¡Click me!',
};

const whenMoleculesExplanationPopoverShows = () => {
    const moleculesExplanationSpotifyIconElement = document.getElementById(moleculesExplanationSpotifyIconId);
    if (moleculesExplanationSpotifyIconElement) {
        ReactDOM.render(
            <a
                className="btn btn-sm btn-outline-success p-0 px-1"
                href={spotifyPageUri}
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={['fab', 'spotify']} />
            </a>,
            moleculesExplanationSpotifyIconElement,
        );
    }
};

export const MoleculesListTitle: React.FC = () => {
    return (
        <div className="d-flex align-items-center justify-content-between">
            <h1>
                Your&nbsp;
                <u className="molecules-list-title-underline">Molecules</u>
            </h1>
            <div>
                <button className="btn btn-sm btn-warning" type="button" id={moleculesExplanationBtnId}>
                    <FontAwesomeIcon icon="exclamation-circle" />
                </button>
                <AppPopover
                    sourceElementId={moleculesExplanationBtnId}
                    popoverOptions={moleculesExplanationBtnPopoverOptions}
                    onShowedPopover={whenMoleculesExplanationPopoverShows}
                />
                <AppTooltip
                    sourceElementId={moleculesExplanationBtnId}
                    tooltipOptions={moleculesExplanationBtnTooltipOptions}
                />
            </div>
        </div>
    );
};
