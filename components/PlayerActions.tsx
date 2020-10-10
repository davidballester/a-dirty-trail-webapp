import React from 'react';
import { css } from 'emotion';
import {
    usePlayerActions,
    selectAction,
    useGame,
    useNarrator,
    useGameDispatch,
} from '../contexts/gameContext';

const PlayerActions = () => {
    const playerActions = usePlayerActions();
    const game = useGame();
    const narrator = useNarrator();
    const dispatch = useGameDispatch();
    if (!playerActions.length) {
        return null;
    }
    return (
        <div
            className={css`
                padding-top: 1rem;
            `}
        >
            {playerActions.map((playerAction) => (
                <button
                    key={playerAction.getName()}
                    className={css`
                        cursor: pointer;
                        border: none;
                        border-radius: 5px;
                        background: black;
                        color: white;
                        text-align: center;
                        display: block;
                        margin-bottom: 0.5rem;
                        padding: 1rem;
                        width: 100%;
                        transition: all 0.5s;
                        &:hover {
                            background: #333;
                        }
                    `}
                    onClick={() =>
                        selectAction(playerAction, game, narrator, dispatch)
                    }
                >
                    {playerAction.getName()}
                </button>
            ))}
        </div>
    );
};

export default PlayerActions;
