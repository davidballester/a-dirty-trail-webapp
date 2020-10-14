import React from 'react';
import { css } from 'emotion';
import { usePlayerActions } from '../contexts/gameContext';
import PlayerAction from './PlayerAction';

const PlayerActions = () => {
    const playerActions = usePlayerActions();
    if (!playerActions.length) {
        return null;
    }
    return (
        <section
            className={css`
                padding-top: 1rem;
            `}
        >
            {playerActions.map((playerAction) => (
                <PlayerAction key={playerAction.id} action={playerAction} />
            ))}
        </section>
    );
};

export default PlayerActions;
