import React, { ReactElement, useCallback, useState } from 'react';
import { css } from 'emotion';
import CombatOponents from './CombatOponents';
import CombatPlayerArea from './CombatPlayerArea';
import CombatPlayerActions from './CombatPlayerActions';
import CombatLog from './CombatLog';
import {
    useCanPlayerAct,
    useExecuteNextOponentAction,
} from '../contexts/gameContext';

const CombatView = () => {
    const canPlayerAct = useCanPlayerAct();
    const executeNextOponentAction = useExecuteNextOponentAction();
    const onOutcomeLogged = useCallback(() => {
        if (!canPlayerAct) {
            setTimeout(() => {
                executeNextOponentAction();
            }, 1000);
        }
    }, [canPlayerAct, executeNextOponentAction]);
    return (
        <CombatBoard>
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
                <CombatPlayerActions enabled={canPlayerAct} />
            </div>
        </CombatBoard>
    );
};

export default CombatView;

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
        `}
    >
        <div
            className={css`
                position: absolute;
                width: 100%;
                height: 100%;
            `}
        />
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
