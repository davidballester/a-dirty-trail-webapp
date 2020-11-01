import React, { ReactElement } from 'react';
import { css } from 'emotion';
import ItemIcon from './ItemIcon';
import WeaponAmmunition from './WeaponAmmunition';
import Ammunition from './Ammunition';
import useSkillLevelText from '../hooks/useSkillLevelText';
import { Button } from 'react-bootstrap';
import { animated, Transition } from 'react-spring';
import GameWeapon from 'a-dirty-trail/build/core/Weapon';
import Damage from 'a-dirty-trail/build/core/Damage';
import GameTrinket from 'a-dirty-trail/build/core/Trinket';
import { AmmunitionByType } from 'a-dirty-trail/build/core/Inventory';
import { useNarrativeSceneEngine } from '../contexts/narrativeSceneEngineContext';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';
import { usePlayer } from '../contexts/sceneContext';

const NarrationInventory = (): ReactElement => (
    <article>
        <header>
            <h2>Inventory</h2>
        </header>
        <ListOfItems />
    </article>
);

const ListOfItems = (): ReactElement => {
    const player = usePlayer();
    const inventory = player.getInventory();
    return (
        <ul
            className={
                'list-unstyled ' +
                css`
                    > li {
                        padding: 0.5rem;
                        transition: background 0.5s;
                        :hover {
                            background: var(--light);
                        }
                    }
                `
            }
        >
            <Weapons weapons={inventory.getWeapons()} />
            <Ammunitions ammunitions={inventory.getAmmunitionsByType()} />
            <Trinkets trinkets={inventory.getTrinkets()} />
        </ul>
    );
};

const Weapons = ({ weapons }: { weapons: GameWeapon[] }): ReactElement => (
    <>
        {weapons.map((weapon) => (
            <li key={weapon.getId()}>
                <Weapon weapon={weapon} />
            </li>
        ))}
    </>
);

const Weapon = ({ weapon }: { weapon: GameWeapon }): ReactElement => {
    const player = usePlayer();
    const skill = player.getSkill(weapon.getSkill());
    const skillLevelText = useSkillLevelText(skill);
    return (
        <article>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    justify-content: left;
                `}
            >
                <ItemIcon
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
            </div>
            <ReloadWeaponButton weapon={weapon} />
        </article>
    );
};

const ReloadWeaponButton = ({
    weapon,
}: {
    weapon: GameWeapon;
}): ReactElement => {
    const reloadAction = useWeaponReloadAction(weapon);
    const narrativeSceneEngine = useNarrativeSceneEngine();
    if (!reloadAction) {
        return null;
    }
    return (
        <Transition
            items={reloadAction}
            from={{
                opacity: 0,
                height: 0,
                overflow: 'hidden',
            }}
            enter={{
                opacity: 1,
                height: 31,
            }}
            leave={{
                opacity: 0,
                height: 0,
            }}
        >
            {(style) => (
                <animated.div style={style}>
                    <Button
                        variant="outline-dark"
                        block
                        size="sm"
                        onClick={() => {
                            narrativeSceneEngine.executePlayerAction(
                                reloadAction
                            );
                        }}
                    >
                        Reload
                    </Button>
                </animated.div>
            )}
        </Transition>
    );
};

const useWeaponReloadAction = (
    weapon: GameWeapon
): ReloadAction | undefined => {
    const narrativeSceneEngine = useNarrativeSceneEngine();
    const reloadActions = narrativeSceneEngine
        .getPlayerActions()
        .getReloadActions();
    return reloadActions.find((action) => action.getWeapon().equals(weapon));
};

const WeaponDamage = ({ damage }: { damage: Damage }) => (
    <span>
        {damage.getMin()} - {damage.getMax()}
    </span>
);

const Ammunitions = ({
    ammunitions,
}: {
    ammunitions: AmmunitionByType;
}): ReactElement => (
    <>
        {Object.keys(ammunitions).map((ammunitionType) => (
            <li key={ammunitionType}>
                <Ammunition
                    type={ammunitionType}
                    quantity={ammunitions[ammunitionType]}
                />
            </li>
        ))}
    </>
);

const Trinkets = ({ trinkets }: { trinkets: GameTrinket[] }): ReactElement => (
    <>
        {trinkets.map((trinket) => (
            <li key={trinket.getId()}>
                <Trinket trinket={trinket} />
            </li>
        ))}
    </>
);

const Trinket = ({ trinket }: { trinket: GameTrinket }): ReactElement => (
    <p>
        <span
            className={css`
                display: block;
            `}
        >
            {trinket.getName()}
        </span>
        {trinket.getDescription() && (
            <span className="font-italic">{trinket.getDescription()}</span>
        )}
    </p>
);

export default NarrationInventory;
