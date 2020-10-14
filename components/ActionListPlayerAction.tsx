import React from 'react';
import { css, keyframes } from 'emotion';
import { Actor } from 'a-dirty-trail';

const pulsatingBoxShadow = keyframes`
    from, 100% {
        box-shadow: 0 0 2px var(--dark);
    }

    50% {
        box-shadow: 0 0 5px var(--danger);
    }
`;

const activeClassName = css`
    animation: ${pulsatingBoxShadow} 1s ease infinite;
`;

const ActionListPlayerAction = ({
    player,
    active = false,
}: {
    player: Actor;
    active?: boolean;
}) => (
    <p
        className={css`
            font-style: italic;
            padding: 0 0.5rem;
            box-shadow: 0 0 2px var(--dark);
            ${active ? activeClassName : ''}
        `}
    >
        {`${player.name} action`.toUpperCase()}
    </p>
);

export default ActionListPlayerAction;
