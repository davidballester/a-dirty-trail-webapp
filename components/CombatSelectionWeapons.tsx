import React from 'react';
import {
    useActionType,
    useAvailableWeapons,
    useOponent,
    useWeapon,
    useSelectWeapon,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import { Weapon } from 'a-dirty-trail';
import CombatSelectionIconButton from './CombatSelectionIconButton';

const CombatSelectionWeapons = () => {
    const availableWeapons = useAvailableWeapons();
    const isVisible = useIsWeaponSelectionVisible();
    return (
        <CombatSelectionCategoryTransition
            visible={isVisible}
            items={availableWeapons}
        >
            {(availableWeapon) => <WeaponButton weapon={availableWeapon} />}
        </CombatSelectionCategoryTransition>
    );
};

export default CombatSelectionWeapons;

const useIsWeaponSelectionVisible = () => {
    const isVisibleIfReload = useIsWeaponSelectionVisibleForReloadAction();
    const isVisibleIfAttack = useIsWeaponSelectionVisibleForAttackAction();
    const isVisible = isVisibleIfReload || isVisibleIfAttack;
    return isVisible;
};

const useIsWeaponSelectionVisibleForReloadAction = () => {
    const actionType = useActionType();
    const weapon = useWeapon();
    const isReloadAction = actionType === 'reload';
    const isVisibleIfReload = isReloadAction && !weapon;
    return isVisibleIfReload;
};

const useIsWeaponSelectionVisibleForAttackAction = () => {
    const actionType = useActionType();
    const oponent = useOponent();
    const weapon = useWeapon();
    const isAttackAction = actionType === 'attack';
    const isVisibleIfAttack = isAttackAction && !!oponent && !weapon;
    return isVisibleIfAttack;
};

const WeaponButton = ({ weapon }: { weapon: Weapon }) => {
    const selectWeapon = useSelectWeapon();
    return (
        <CombatSelectionIconButton
            iconSrc={`${weapon.name}-outlined.svg`}
            name={weapon.name}
            onClick={() => selectWeapon(weapon)}
        />
    );
};
