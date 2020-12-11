import React, { ReactElement, useEffect } from 'react';
import { css } from 'emotion';
import {
    useClearSelection,
    useIsSelectionComplete,
    useSelectedPlayerAction,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionBreadcrumb from './CombatSelectionBreadcrumbs';
import CombatSelectionActionType from './CombatSelectionActionType';
import CombatSelectionOponents from './CombatSelectionOponents';
import CombatSelectionDeadOponents from './CombatSelectionDeadOponents';
import CombatSelectionClear from './CombatSelectionClear';
import CombatSelectionExitCombat from './CombatSelectionExitCombat';
import CombatSelectionWeapons from './CombatSelectionWeapons';
import { animated, Transition } from 'react-spring';
import {
    useExecutePlayerAction,
    useIsPlayerTurn,
} from '../contexts/combatSceneEngineContext';

const CombatPlayerActions = (): ReactElement => {
    const isPlayerTurn = useIsPlayerTurn();
    return (
        <section>
            <ExecuteActionOnSelectionCompleted>
                <Transition
                    items={isPlayerTurn || undefined}
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

const useExecuteActionOnSelectionCompleted = (): void => {
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
        <CombatSelectionDeadOponents />
        <CombatSelectionWeapons />
    </div>
);
