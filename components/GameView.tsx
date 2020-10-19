import React from 'react';
import { css } from 'emotion';
import { animated, Spring } from 'react-spring';
import { GameViewMode, useGameViewMode } from '../contexts/gameViewModeContext';
import CombatView from './CombatView';
import NarrationView from './NarrationView';

const GameView = () => {
    const gameViewMode = useGameViewMode();
    const isNarration = gameViewMode === GameViewMode.narration;
    return (
        <div
            className={css`
                position: relative;
                > div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    will-change: transform;
                }
            `}
        >
            <NarrationView />
            {!isNarration && (
                <Spring
                    from={{
                        transform: `perspective(600px) rotateX(180deg)`,
                    }}
                    to={{
                        transform: `perspective(600px) rotateX(0deg)`,
                    }}
                >
                    {(style) => (
                        <animated.div style={style as any}>
                            <CombatView />
                        </animated.div>
                    )}
                </Spring>
            )}
        </div>
    );
};

export default GameView;
