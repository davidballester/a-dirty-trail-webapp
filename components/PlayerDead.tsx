import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Spring } from 'react-spring';
import { usePlayer } from '../contexts/narrativeSceneEngineContext';

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
                                max-width: 15rem;
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
                </animated.div>
            )}
        </Spring>
    );
};

export default PlayerDead;
