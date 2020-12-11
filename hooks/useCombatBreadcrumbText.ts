import {
    useActionType,
    useOponent,
    useWeapon,
} from '../contexts/combatActionSelectionContext';
import capitalize from '../helpers/capitalize';

const useBreadcrumbText = (): string => {
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

export default useBreadcrumbText;

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
        return `Select weapon to attack ${capitalize(oponent.getName())}`;
    }
    return null;
};

const useReloadBreadcrumbtText = () => {
    const weapon = useWeapon();
    if (!weapon) {
        return 'Select weapon to reload';
    }
    return null;
};

const useLootBreadcrumbtText = () => {
    const oponent = useOponent();
    if (!oponent) {
        return 'Select fallen oponent to loot';
    }
    return null;
};
