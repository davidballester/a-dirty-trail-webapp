import React from 'react';
import { css } from 'emotion';
import { animated, useSpring } from 'react-spring';
import { GameViewMode, useGameViewMode } from '../contexts/gameViewModeContext';
import CombatView from './CombatView';
import NarrationView from './NarrationView';

const GameView = () => {
    const gameViewMode = useGameViewMode();
    const isNarration = gameViewMode === GameViewMode.narration;
    const { transform, opacity } = useSpring({
        opacity: isNarration ? 0 : 1,
        transform: `perspective(600px) rotateX(${isNarration ? 0 : 180}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return (
        <div
            className={css`
                position: relative;
                > div {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    will-change: opacity, transform;
                }
            `}
        >
            <animated.div
                style={
                    {
                        opacity: opacity.to((o) => 1 - o),
                        transform,
                    } as any
                }
            >
                <NarrationView />
            </animated.div>
            {!isNarration && (
                <animated.div
                    style={
                        {
                            opacity,
                            transform: transform.to(
                                (t) => `${t} rotateX(180deg)`
                            ),
                        } as any
                    }
                >
                    <CombatView />
                </animated.div>
            )}
        </div>
    );
};

export default GameView;
