import React, { ReactElement } from 'react';
import {
    useActionType,
    useAvailableDeadOponents,
    useOponent,
    useSelectOponent,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import { useOponentIcon } from '../contexts/oponentIconsContext';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';

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
    const oponentIcon = useOponentIcon(oponent.getName());
    return (
        <CombatSelectionIconButton
            iconSrc={oponentIcon}
            name={oponent.getName()}
            onClick={() => selectOponent(oponent)}
        />
    );
};
