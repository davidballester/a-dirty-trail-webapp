import React, { ReactElement, useState, useEffect } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';
import CombatView from './CombatView';
import NarrationView from './NarrationView';
import { useScene } from '../contexts/narrativeSceneEngineContext';

const GameView = (): ReactElement => {
    const scene = useScene();
    const [gameViewMode, setGameViewMode] = useState(GameViewMode.narration);
    useEffect(() => {
        if (scene) {
            setGameViewMode(
                scene.isCombat() ? GameViewMode.combat : GameViewMode.narration
            );
        }
    }, [scene]);
    if (!scene) {
        return null;
    }
    return (
        <div>
            <NarrationWithTransition
                isNarration={gameViewMode === GameViewMode.narration}
            />
            <CombatWithTransition
                isCombat={gameViewMode === GameViewMode.combat}
            />
        </div>
    );
};

export default GameView;

export enum GameViewMode {
    narration,
    combat,
}

const NarrationWithTransition = ({
    isNarration,
}: {
    isNarration: boolean;
}): ReactElement => (
    <div
        className={css`
            display: ${isNarration ? 'block' : 'none'};
        `}
    >
        <NarrationView />
    </div>
);

const CombatWithTransition = ({
    isCombat,
}: {
    isCombat: boolean;
}): ReactElement => (
    <Transition
        items={isCombat || undefined}
        from={{
            opacity: 0,
            transform: 'translate3d(0, -50%, 0)',
        }}
        enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        leave={{
            opacity: 0,
            transform: 'translate3d(0, 50%, 0)',
        }}
    >
        {(style) => (
            <animated.div
                style={style}
                className={
                    'absolute-top-left ' +
                    css`
                        z-index: 1;
                    `
                }
            >
                {<CombatView />}
            </animated.div>
        )}
    </Transition>
);
