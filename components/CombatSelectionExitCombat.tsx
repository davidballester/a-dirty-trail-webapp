import React, { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { usePlayerActions } from '../contexts/combatSceneEngineContext';
import AdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import { useExecutePlayerAction } from '../contexts/narrativeSceneEngineContext';
import { animated, Transition } from 'react-spring';

const CombatSelectionExitCombat = (): ReactElement => {
    const playerActions = usePlayerActions();
    const advanceActions = playerActions.getAdvanceActions();
    return (
        <Transition
            items={advanceActions}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
        >
            {(style, advanceAction) => (
                <animated.div style={style}>
                    <ExitButton action={advanceAction} />
                </animated.div>
            )}
        </Transition>
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
