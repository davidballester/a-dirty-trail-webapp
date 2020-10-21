import React, { ReactElement, useEffect } from 'react';
import { css } from 'emotion';
import {
    CombatActionSelectionProvider,
    useClearSelection,
    useIsSelectionComplete,
    useSelectedPlayerAction,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionBreadcrumb from './CombatSelectionBreadcrumbs';
import CombatSelectionActionType from './CombatSelectionActionType';
import CombatSelectionOponents from './CombatSelectionOponens';
import CombatSelectionInventories from './CombatSelectionInventories';
import CombatSelectionClear from './CombatSelectionClear';
import CombatSelectionExitCombat from './CombatSelectionExitCombat';
import { useExecutePlayerAction } from '../contexts/gameContext';
import CombatSelectionWeapons from './CombatSelectionWeapons';
import { WAIT_FOR_OPONENT_ACTION_MS } from '../helpers/constants';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';

const CombatPlayerActions = () => (
    <section>
        <CombatActionSelectionProvider>
            <ExecuteActionOnSelectionCompleted>
                <CombatSelectionBreadcrumb />
                <SelectionItems />
                <CombatSelectionClear />
                <CombatSelectionExitCombat />
            </ExecuteActionOnSelectionCompleted>
        </CombatActionSelectionProvider>
    </section>
);

export default CombatPlayerActions;

const ExecuteActionOnSelectionCompleted = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}) => {
    useExecuteActionOnSelectionCompleted();
    return <>{children}</>;
};

const useExecuteActionOnSelectionCompleted = () => {
    const isSelectionComplete = useIsSelectionComplete();
    const selectedPlayerAction = useSelectedPlayerAction();
    const executePlayerAction = useExecutePlayerAction();
    const clearSelection = useClearSelection();
    useEffect(() => {
        if (isSelectionComplete) {
            executePlayerAction(selectedPlayerAction);
            setTimeout(() => {
                clearSelection();
            }, WAIT_FOR_OPONENT_ACTION_MS);
        }
    }, [isSelectionComplete]);
};

const SelectionItems = () => (
    <div
        className={css`
            position: relative;
            height: 25vh;
            > div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        `}
    >
        <CombatSelectionActionType />
        <CombatSelectionOponents />
        <CombatSelectionInventories />
        <CombatSelectionWeapons />
    </div>
);
