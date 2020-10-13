import React from 'react';
import { css } from 'emotion';
import {
    usePlayerActions,
    selectPlayerAction,
    useGame,
    useGameDispatch,
} from '../contexts/gameContext';
import Button from 'react-bootstrap/Button';

const PlayerActions = () => {
    const playerActions = usePlayerActions();
    const game = useGame();
    const dispatch = useGameDispatch();
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
                <Button
                    key={playerAction.getName()}
                    variant="dark"
                    onClick={() =>
                        selectPlayerAction(playerAction, game, dispatch)
                    }
                    block
                >
                    {playerAction.getName()}
                </Button>
            ))}
        </section>
    );
};

export default PlayerActions;
