import React, { ReactElement, useEffect } from 'react';
import { css } from 'emotion';
import CombatOponents from './CombatOponents';
import CombatPlayerArea from './CombatPlayerArea';
import CombatPlayerActions from './CombatPlayerActions';
import CombatLog from './CombatLog';
import { WAIT_FOR_OPONENT_ACTION_MS } from '../helpers/constants';
import { OponentsIconsProvider } from '../contexts/oponentIconsContext';
import {
    useExecuteNextOponentAction,
    useIsPlayerTurn,
    usePlayer,
    useScene,
} from '../contexts/combatSceneEngineContext';
import PlayerDead from './PlayerDead';
import { CombatActionSelectionProvider } from '../contexts/combatActionSelectionContext';

const CombatView = (): ReactElement => {
    const scene = useScene();
    const player = usePlayer();
    useAdvanceTurn();
    if (!scene) {
        return null;
    }
    return (
        <CombatBoard>
            {player.isAlive() && (
                <OponentsIconsProvider>
                    <CombatActionSelectionProvider>
                        <CombatPlayerArea />
                        <div
                            className={css`
                                margin-top: 1.5rem;
                                @media (min-width: 900px) {
                                    margin-top: 3rem;
                                }
                            `}
                        >
                            <CombatOponents />
                        </div>
                        <CombatLog />
                        <div className="absolute-bottom-left">
                            <CombatPlayerActions />
                        </div>
                    </CombatActionSelectionProvider>
                </OponentsIconsProvider>
            )}
            {!player.isAlive() && <PlayerDead />}
        </CombatBoard>
    );
};

export default CombatView;

const useAdvanceTurn = () => {
    const executeNextOponentAction = useExecuteNextOponentAction();
    const isPlayerTurn = useIsPlayerTurn();
    useEffect(() => {
        if (!isPlayerTurn) {
            const executeNextOponentActionTimeoutKey = setTimeout(() => {
                executeNextOponentAction();
            }, WAIT_FOR_OPONENT_ACTION_MS);
            return () => clearTimeout(executeNextOponentActionTimeoutKey);
        }
    }, [isPlayerTurn]);
};

const CombatBoard = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => (
    <div
        className={css`
            position: relative;
            width: 100vw;
            height: 100vh;
            background-color: var(--light);
        `}
    >
        <GradientBackground />
        <div
            className={
                'absolute-top-left ' +
                css`
                    height: 100%;
                    z-index: 10;
                    padding: 1rem;
                `
            }
        >
            <div
                className={css`
                    position: relative;
                    max-width: 600px;
                    height: 100%;
                    margin: auto;
                    padding: 0 2rem;
                `}
            >
                {children}
            </div>
        </div>
    </div>
);

const GradientBackground = (): ReactElement => (
    <div
        className={
            'absolute-top-left ' +
            css`
                height: 100%;
                background: radial-gradient(
                    circle,
                    transparent 0%,
                    rgba(0, 0, 0, 0.1) 100%
                );
            `
        }
    />
);
