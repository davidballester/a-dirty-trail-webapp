import React, { ReactElement } from 'react';
import { css } from 'emotion';
import {
    useActionType,
    useAvailableWeapons,
    useOponent,
    useWeapon,
    useSelectWeapon,
} from '../contexts/combatActionSelectionContext';
import CombatSelectionCategoryTransition from './CombatSelectionCategory';
import CombatSelectionIconButton from './CombatSelectionIconButton';
import WeaponAmmunition from './WeaponAmmunition';
import Weapon from 'a-dirty-trail/build/core/Weapon';
import { usePlayer } from '../contexts/combatSceneEngineContext';

const CombatSelectionWeapons = (): ReactElement => {
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

const WeaponButton = ({ weapon }: { weapon: Weapon }): ReactElement => {
    const player = usePlayer();
    const selectWeapon = useSelectWeapon();
    const hitChance =
        player.getSkill(weapon.getSkill()).getProbabilityOfSuccess() * 100;
    return (
        <CombatSelectionIconButton
            iconSrc={`${weapon.getType()}.svg`}
            name={weapon.getName()}
            onClick={() => selectWeapon(weapon)}
        >
            {weapon.getAmmunition() && (
                <WeaponAmmunition ammunition={weapon.getAmmunition()} />
            )}
            <p
                className={css`
                    margin: 0;
                    padding: 0.5rem 0;
                `}
            >
                Hit chance: <strong>{hitChance}%</strong>
            </p>
        </CombatSelectionIconButton>
    );
};
