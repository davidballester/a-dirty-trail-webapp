import React from 'react';
import {
    useActionType,
    useAvailableInventories,
    useInventory,
    useSelectInventory,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { Inventory } from 'a-dirty-trail';
import useOponentIcon from '../hooks/useOponentIcon';
import CombatSelectionIconButton from './CombatSelectionIconButton';

const CombatSelectionInventories = () => {
    const inventory = useInventory();
    const actionType = useActionType();
    const availableInventories = useAvailableInventories();
    return (
        <CombatSelectionCategoryTransition
            visible={actionType === 'loot' && !inventory}
            items={availableInventories}
        >
            {(availableInventory) => (
                <InventoryButton inventory={availableInventory} />
            )}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionInventories;

const InventoryButton = ({ inventory }: { inventory: Inventory }) => {
    const selectInventory = useSelectInventory();
    const inventoryIcon = useOponentIcon(inventory.name);
    return (
        <CombatSelectionIconButton
            iconSrc={inventoryIcon}
            name={inventory.name}
            onClick={() => selectInventory(inventory)}
        />
    );
};
