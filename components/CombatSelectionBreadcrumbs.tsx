import React from 'react';
import { Spring, animated } from 'react-spring';
import {
    useActionType,
    useInventory,
    useOponent,
    useWeapon,
} from '../contexts/combatActionSelectionContext';
import capitalize from '../helpers/capitalize';

const CombatSelectionBreadcrumb = () => {
    const actionType = useActionType();
    const breadcrumbText = useBreadcrumbText();
    return (
        <Spring
            from={{ opacity: !!actionType ? 0 : 1 }}
            to={{ opacity: !!actionType ? 1 : 0 }}
        >
            {(style) => (
                <animated.div style={style as any}>
                    <h6 className="text-center">{breadcrumbText}</h6>
                </animated.div>
            )}
        </Spring>
    );
};

export default CombatSelectionBreadcrumb;

const useBreadcrumbText = () => {
    const actionType = useActionType();
    const attackBreadcrumbText = useAttackBreadcrumbtText();
    const reloadBreadcrumbText = useReloadBreadcrumbtText();
    const lootBreadcrumbText = useLootBreadcrumbtText();
    switch (actionType) {
        case 'attack': {
            return attackBreadcrumbText;
        }
        case 'reload': {
            return reloadBreadcrumbText;
        }
        case 'loot': {
            return lootBreadcrumbText;
        }
    }
};

const useAttackBreadcrumbtText = () => {
    const actionType = useActionType();
    const oponent = useOponent();
    const weapon = useWeapon();
    if (actionType !== 'attack') {
        return null;
    }
    if (!oponent) {
        return 'Select oponent to attack';
    }
    if (!weapon) {
        return `Select weapon to attack ${capitalize(oponent.name)}`;
    }
    return `Attacking ${capitalize(oponent.name)} with ${weapon.name}`;
};

const useReloadBreadcrumbtText = () => {
    const weapon = useWeapon();
    if (!weapon) {
        return 'Select weapon to reload';
    }
    return `Reloading ${weapon.name}`;
};

const useLootBreadcrumbtText = () => {
    const inventory = useInventory();
    if (!inventory) {
        return 'Select fallen oponent to loot';
    }
    return `Looting ${inventory.name}`;
};
