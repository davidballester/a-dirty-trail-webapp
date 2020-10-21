import React, { ReactElement } from 'react';
import {
    useActionType,
    useAvailableInventories,
    useInventory,
    useSelectInventory,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { Inventory } from 'a-dirty-trail';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import { useOponentIcon } from '../contexts/oponentIconsContext';

const CombatSelectionInventories = (): ReactElement => {
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

const InventoryButton = ({
    inventory,
}: {
    inventory: Inventory;
}): ReactElement => {
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
