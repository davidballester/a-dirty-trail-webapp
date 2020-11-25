import React, { ReactElement } from 'react';
import {
    useActionType,
    useAvailableDeadOponents,
    useOponent,
    useSelectOponent,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import OponentIcon from './OponentIcon';

const CombatSelectionDeadOponents = (): ReactElement => {
    const oponent = useOponent();
    const actionType = useActionType();
    const deadOponents = useAvailableDeadOponents();
    return (
        <CombatSelectionCategoryTransition
            visible={actionType === 'loot' && !oponent}
            items={deadOponents}
        >
            {(deadOponent) => <DeadOponentButton oponent={deadOponent} />}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionDeadOponents;

const DeadOponentButton = ({
    oponent,
}: {
    oponent: NonPlayableActor;
}): ReactElement => {
    const selectOponent = useSelectOponent();
    return (
        <CombatSelectionIconButton
            icon={<OponentIcon oponent={oponent} />}
            name={oponent.getName()}
            onClick={() => selectOponent(oponent)}
        />
    );
};
