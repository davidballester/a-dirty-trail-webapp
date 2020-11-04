import React, { ReactElement } from 'react';
import { css } from 'emotion';
import GameWeapon from 'a-dirty-trail/build/core/Weapon';
import WeaponAmmunition from './WeaponAmmunition';
import useSkillLevelText from '../hooks/useSkillLevelText';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Damage from 'a-dirty-trail/build/core/Damage';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';
import {
    useExecutePlayerAction,
    useNarrativeSceneEngine,
    usePlayer,
} from '../contexts/narrativeSceneEngineContext';
import NarrationInventoryItemIcon from './NarrationInventoryItemIcon';
import UnloadAction from 'a-dirty-trail/build/actions/UnloadAction';
import DiscardWeaponAction from 'a-dirty-trail/build/actions/DiscardWeaponAction';
import ActionsMap from 'a-dirty-trail/build/core/ActionsMap';

const NarrationInventoryWeapon = ({
    weapon,
}: {
    weapon: GameWeapon;
}): ReactElement => {
    const player = usePlayer();
    const skill = player.getSkill(weapon.getSkill());
    const skillLevelText = useSkillLevelText(skill);
    const weaponActions = useWeaponActions(weapon);
    return (
        <article>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    justify-content: left;
                `}
            >
                <NarrationInventoryItemIcon
                    src={`${weapon.getType()}.svg`}
                    alt={weapon.getName()}
                />
                <dl
                    className={
                        'row ' +
                        css`
                            margin-bottom: 0;
                            flex-grow: 1;
                        `
                    }
                >
                    <dt className="col-sm-3">Name</dt>
                    <dd className="col-sm-9">
                        <span className="text-capitalize">
                            {weapon.getName()}
                        </span>
                    </dd>

                    <dt className="col-sm-3">Damage</dt>
                    <dd className="col-sm-9">
                        <WeaponDamage damage={weapon.getDamage()} />
                    </dd>

                    <dt className="col-sm-3">Skill level</dt>
                    <dd className="col-sm-9">{skillLevelText}</dd>

                    {weapon.getAmmunition() && (
                        <>
                            <dt className="col-sm-3">Ammunition</dt>
                            <dd className="col-sm-9">
                                <WeaponAmmunition
                                    ammunition={weapon.getAmmunition()}
                                />
                            </dd>
                        </>
                    )}
                </dl>
                {weaponActions.length ? (
                    <WeaponActions weaponActions={weaponActions} />
                ) : null}
            </div>
        </article>
    );
};

export default NarrationInventoryWeapon;

const useWeaponActions = (
    weapon: GameWeapon
): Array<ReloadAction | UnloadAction | DiscardWeaponAction> => {
    const narrativeSceneEngine = useNarrativeSceneEngine();
    const playerActions = narrativeSceneEngine.getPlayerActions();
    const reloadActions = playerActions
        .getReloadActions()
        .filter((action) => action.getWeapon().equals(weapon));
    const unloadActions = playerActions
        .getUnloadActions()
        .filter((action) => action.getWeapon().equals(weapon));
    const discardWeaponActions = playerActions
        .getDiscardWeaponActions()
        .filter((action) => action.getWeapon().equals(weapon));
    return [...reloadActions, ...unloadActions, ...discardWeaponActions];
};

const WeaponActions = ({
    weaponActions,
}: {
    weaponActions: Array<ReloadAction | UnloadAction | DiscardWeaponAction>;
}): ReactElement => {
    const executePlayerAction = useExecutePlayerAction();
    const actionsMap = new ActionsMap({ actions: weaponActions });
    const reloadAction = actionsMap.getReloadActions()[0];
    const unloadAction = actionsMap.getUnloadActions()[0];
    const discardAction = actionsMap.getDiscardWeaponActions()[0];
    return (
        <DropdownButton
            title="Actions"
            variant="light"
            className={css`
                border: 1px solid var(--dark);
                border-radius: 0.25rem;
            `}
        >
            {reloadAction && (
                <Dropdown.Item
                    onClick={() => {
                        executePlayerAction(reloadAction);
                    }}
                >
                    Reload
                </Dropdown.Item>
            )}
            {unloadAction && (
                <Dropdown.Item
                    onClick={() => {
                        executePlayerAction(unloadAction);
                    }}
                >
                    Unload
                </Dropdown.Item>
            )}
            {discardAction && (
                <Dropdown.Item
                    onClick={() => {
                        executePlayerAction(discardAction);
                    }}
                >
                    Discard
                </Dropdown.Item>
            )}
        </DropdownButton>
    );
};

const WeaponDamage = ({ damage }: { damage: Damage }) => (
    <span>
        {damage.getMin()} - {damage.getMax()}
    </span>
);
