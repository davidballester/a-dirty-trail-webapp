import React, { ReactElement } from 'react';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { Button } from 'react-bootstrap';
import { usePlayerActions } from '../contexts/combatSceneEngineContext';
import AdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import { useExecutePlayerAction } from '../contexts/narrativeSceneEngineContext';

const CombatSelectionExitCombat = (): ReactElement => {
    const playerActions = usePlayerActions();
    const advanceActions = playerActions.getAdvanceActions();
    return (
        <CombatSelectionCategoryTransition
            visible={advanceActions.length > 0}
            items={advanceActions}
        >
            {(advanceAction) => <ExitButton action={advanceAction} />}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionExitCombat;

const ExitButton = ({ action }: { action: AdvanceAction }): ReactElement => {
    const executePlayerAction = useExecutePlayerAction();
    return (
        <Button
            variant="dark"
            onClick={() => {
                executePlayerAction(action);
            }}
            className="text-capitalize"
            block
        >
            {action.getName()}
        </Button>
    );
};
