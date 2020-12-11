import React, { ReactElement } from 'react';
import {
    useOponent,
    useActionType,
    useAvailableOponents,
    useSelectOponent,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import OponentIcon from './OponentIcon';

const CombatSelectionOponents = (): ReactElement => {
    const oponent = useOponent();
    const actionType = useActionType();
    const availableOponents = useAvailableOponents();
    return (
        <CombatSelectionCategoryTransition
            visible={actionType === 'attack' && !oponent}
            items={availableOponents}
        >
            {(availableOponent) => <OponentButton oponent={availableOponent} />}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionOponents;

const OponentButton = ({
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
            caption={false}
        />
    );
};
