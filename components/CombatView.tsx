import React, { ReactElement, useCallback } from 'react';
import { css } from 'emotion';
import CombatOponents from './CombatOponents';
import CombatPlayerArea from './CombatPlayerArea';
import CombatPlayerActions from './CombatPlayerActions';
import CombatLog from './CombatLog';
import {
    useCanPlayerAct,
    useExecuteNextOponentAction,
} from '../contexts/gameContext';
import { WAIT_FOR_OPONENT_ACTION_MS } from '../helpers/constants';
import { OponentsIconsProvider } from '../contexts/oponentIconsContext';

const CombatView = () => {
    const onOutcomeLogged = useOnOutcomeLogged();
    const canPlayerAct = useCanPlayerAct();
    return (
        <CombatBoard>
            <OponentsIconsProvider>
                <CombatPlayerArea />
                <div
                    className={css`
                        margin-top: 3rem;
                    `}
                >
                    <CombatOponents />
                </div>
                <CombatLog onOutcomeLogged={onOutcomeLogged} />
                <div
                    className={css`
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                    `}
                >
                    <CombatPlayerActions />
                </div>
            </OponentsIconsProvider>
        </CombatBoard>
    );
};

export default CombatView;

const useOnOutcomeLogged = () => {
    const canPlayerAct = useCanPlayerAct();
    const executeNextOponentAction = useExecuteNextOponentAction();
    const onOutcomeLogged = useCallback(() => {
        if (!canPlayerAct) {
            setTimeout(() => {
                executeNextOponentAction();
            }, WAIT_FOR_OPONENT_ACTION_MS);
        }
    }, [canPlayerAct, executeNextOponentAction]);
    return onOutcomeLogged;
};

const CombatBoard = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}) => (
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
            className={css`
                position: absolute;
                width: 100%;
                height: 100%;
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
                `}
            >
                {children}
            </div>
        </div>
    </div>
);

const GradientBackground = () => (
    <div
        className={css`
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle,
                transparent 0%,
                rgba(0, 0, 0, 0.1) 100%
            );
        `}
    />
);
