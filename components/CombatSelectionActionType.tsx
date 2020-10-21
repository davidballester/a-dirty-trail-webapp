import React from 'react';
import { Button } from 'react-bootstrap';
import {
    useActionType,
    useAvailableActionTypes,
    ActionType,
    useSelectActionType,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';

const CombatSelectionActionType = () => {
    const actionType = useActionType();
    const availableActionTypes = useAvailableActionTypes();
    return (
        <CombatSelectionCategoryTransition
            visible={!actionType}
            items={availableActionTypes}
        >
            {(availableActionType) => (
                <ActionTypeButton actionType={availableActionType} />
            )}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionActionType;

const ActionTypeButton = ({ actionType }: { actionType: ActionType }) => {
    const selectActionType = useSelectActionType();
    return (
        <Button
            variant="outline-dark"
            onClick={() => selectActionType(actionType)}
            className="text-capitalize"
            block
        >
            {actionType}
        </Button>
    );
};
