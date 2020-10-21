import React from 'react';
import {
    useOponent,
    useActionType,
    useAvailableOponents,
    useSelectOponent,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { NonPlayableActor } from 'a-dirty-trail';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import { useOponentIcon } from '../contexts/oponentIconsContext';

const CombatSelectionOponents = () => {
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

const OponentButton = ({ oponent }: { oponent: NonPlayableActor }) => {
    const selectOponent = useSelectOponent();
    const oponentIcon = useOponentIcon(oponent.name);
    return (
        <CombatSelectionIconButton
            iconSrc={oponentIcon}
            name={oponent.name}
            onClick={() => selectOponent(oponent)}
        />
    );
};
