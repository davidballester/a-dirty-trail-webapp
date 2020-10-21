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
import CombatSelectionOponents from './CombatSelectionOponents';
import CombatSelectionInventories from './CombatSelectionInventories';
import CombatSelectionClear from './CombatSelectionClear';
import CombatSelectionExitCombat from './CombatSelectionExitCombat';
import {
    useCanPlayerAct,
    useExecutePlayerAction,
} from '../contexts/gameContext';
import CombatSelectionWeapons from './CombatSelectionWeapons';
import { animated, Transition } from 'react-spring';

const CombatPlayerActions = (): ReactElement => {
    const canPlayerAct = useCanPlayerAct();
    return (
        <section>
            <CombatActionSelectionProvider>
                <ExecuteActionOnSelectionCompleted>
                    <Transition
                        items={canPlayerAct || undefined}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                    >
                        {(style) => (
                            <animated.div style={style}>
                                <CombatSelectionBreadcrumb />
                                <SelectionItems />
                                <CombatSelectionClear />
                                <CombatSelectionExitCombat />
                            </animated.div>
                        )}
                    </Transition>
                </ExecuteActionOnSelectionCompleted>
            </CombatActionSelectionProvider>
        </section>
    );
};

export default CombatPlayerActions;

const ExecuteActionOnSelectionCompleted = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    useExecuteActionOnSelectionCompleted();
    return <>{children}</>;
};

const useExecuteActionOnSelectionCompleted = (): ReactElement => {
    const isSelectionComplete = useIsSelectionComplete();
    const selectedPlayerAction = useSelectedPlayerAction();
    const executePlayerAction = useExecutePlayerAction();
    const clearSelection = useClearSelection();
    useEffect(() => {
        if (isSelectionComplete) {
            executePlayerAction(selectedPlayerAction);
            clearSelection();
        }
    }, [isSelectionComplete]);
};

const SelectionItems = (): ReactElement => (
    <div
        className={css`
            position: relative;
        `}
    >
        <CombatSelectionActionType />
        <CombatSelectionOponents />
        <CombatSelectionInventories />
        <CombatSelectionWeapons />
    </div>
);
