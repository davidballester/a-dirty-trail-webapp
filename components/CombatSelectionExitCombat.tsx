import React, { ReactElement } from 'react';
import {
    useExecutePlayerAction,
    usePlayerActions,
} from '../contexts/gameContext';
import {
    Action,
    AdvanceToActAction,
    AdvanceToSceneAction,
} from 'a-dirty-trail';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { Button } from 'react-bootstrap';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';

const CombatSelectionExitCombat = (): ReactElement => {
    const playerActions = usePlayerActions();
    const leaveActions = playerActions.filter(
        (action) =>
            action instanceof AdvanceToActAction ||
            action instanceof AdvanceToSceneAction
    );
    return (
        <CombatSelectionCategoryTransition
            visible={leaveActions.length > 0}
            items={leaveActions}
        >
            {(leaveAction) => <ExitButton action={leaveAction} />}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionExitCombat;

const ExitButton = ({ action }: { action: Action }): ReactElement => {
    const executePlayerAction = useExecutePlayerAction();
    const toggleGameViewMode = useToggleGameViewMode();
    return (
        <Button
            variant="dark"
            onClick={() => {
                executePlayerAction(action);
                toggleGameViewMode();
            }}
            className="text-capitalize"
            block
        >
            {action.getName()}
        </Button>
    );
};
