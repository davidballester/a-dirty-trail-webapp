import React from 'react';
import { css } from 'emotion';
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
            <div
                className={css`
                    width: 80%;
                    position: relative;
                    margin: auto;
                    :after {
                        content: '';
                        display: block;
                        padding-bottom: calc(100% + 1.5rem);
                    }
                `}
            >
                <div
                    className={css`
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    `}
                >
                    {actionType}
                </div>
            </div>
        </Button>
    );
};
