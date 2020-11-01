import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';
import { GameViewMode, useGameViewMode } from '../contexts/gameViewModeContext';
// import CombatView from './CombatView';
import NarrationView from './NarrationView';
import { useNarration } from '../contexts/narrationContext';

const GameView = (): ReactElement => {
    const narration = useNarration();
    if (!narration) {
        return null;
    }
    return (
        <div
            className={css`
                position: relative;
                > * {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}
        >
            <NarrationView />
            <CombatWithTransition />
        </div>
    );
};

export default GameView;

const CombatWithTransition = (): ReactElement => {
    const gameViewMode = useGameViewMode();
    const isCombat = gameViewMode === GameViewMode.combat;
    return (
        <Transition
            items={isCombat || undefined}
            from={{
                transform: `perspective(600px) rotateX(180deg)`,
            }}
            enter={{
                transform: `perspective(600px) rotateX(0deg)`,
            }}
            leave={{
                transform: `perspective(600px) rotateX(-180deg)`,
            }}
        >
            {(style) => (
                <animated.div style={style}>{/*<CombatView />*/}</animated.div>
            )}
        </Transition>
    );
};
