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
    useLastActionAndOutcome,
    usePlayer,
    useScene,
} from '../contexts/combatSceneEngineContext';
import PlayerDead from './PlayerDead';
import { CombatActionSelectionProvider } from '../contexts/combatActionSelectionContext';
import CombatSelectionBreadcrumb from './CombatSelectionBreadcrumbs';
import useBreadcrumbText from '../hooks/useCombatBreadcrumbText';
import { animated, Transition } from 'react-spring';
import Action from 'a-dirty-trail/build/actions/Action';

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
                        <CombatText />
                        <div
                            className={css`
                                margin-top: 2rem;
                            `}
                        >
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
            height: 100%;
            min-height: 100vh;
            background-color: var(--light);
        `}
    >
        <GradientBackground />
        <div
            className={css`
                z-index: 10;
                padding: 1rem;
            `}
        >
            <div
                className={css`
                    position: relative;
                    max-width: 600px;
                    height: 100%;
                    margin: auto;
                    @media (min-width: 900px) {
                        padding: 0 2rem;
                    }
                    @media (max-width: 900px) {
                        padding: 0 1rem;
                    }
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

const CombatText = (): ReactElement => {
    const breadcrumbText = useBreadcrumbText();
    const [action] = useLastActionAndOutcome();
    return (
        <div
            className={css`
                position: relative;
                > * {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
            `}
        >
            <Transition
                items={[breadcrumbText || action]}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
            >
                {(style, item) => (
                    <animated.section
                        style={style as any}
                        className={css`
                            text-align: center;
                            position: relative;
                            will-change: opacity;
                            > * {
                            }
                        `}
                    >
                        {item instanceof Action ? (
                            <CombatLog />
                        ) : (
                            <CombatSelectionBreadcrumb />
                        )}
                    </animated.section>
                )}
            </Transition>
        </div>
    );
};
