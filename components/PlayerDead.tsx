import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Spring } from 'react-spring';
import { usePlayer } from '../contexts/narrativeSceneEngineContext';
import { Button } from 'react-bootstrap';
import useClearSavedGames from '../hooks/useClearSavedGames';

const PlayerDead = (): ReactElement => {
    const player = usePlayer();
    return (
        <Spring
            from={{
                opacity: 0,
            }}
            to={{ opacity: 1 }}
        >
            {(style) => (
                <animated.div style={style as any}>
                    <figure
                        className={css`
                            margin-top: 3rem;
                            text-align: center;
                        `}
                    >
                        <img
                            src="player-dead.svg"
                            alt={`${player.getName()} is dead`}
                            className={css`
                                height: 15rem;
                                min-height: 15rem;
                            `}
                        />
                        <figcaption
                            className={css`
                                margin-top: 3rem;
                                font-size: 1.5rem;
                            `}
                        >
                            <span className="text-capitalize">
                                {player.getName()}
                            </span>
                            <span> is dead.</span>
                        </figcaption>
                    </figure>
                    <RestartButton />
                </animated.div>
            )}
        </Spring>
    );
};

export default PlayerDead;

const RestartButton = (): ReactElement => {
    const clearSavedGames = useClearSavedGames();
    return (
        <Button
            variant="dark"
            onClick={() => {
                clearSavedGames();
                window.location.reload();
            }}
            block
        >
            Restart
        </Button>
    );
};
