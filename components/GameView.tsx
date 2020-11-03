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
        <div
            className={css`
                position: relative;
                > * {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding: 0 2rem;
                }
            `}
        >
            <NarrationView />
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

const CombatWithTransition = ({
    isCombat,
}: {
    isCombat: boolean;
}): ReactElement => (
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
        {(style) => <animated.div style={style}>{<CombatView />}</animated.div>}
    </Transition>
);
