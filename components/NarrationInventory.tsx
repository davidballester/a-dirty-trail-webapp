import React, { useRef } from 'react';
import { css } from 'emotion';
import {
    Weapon as GameWeapon,
    Ammunition as GameAmmunition,
    Item as GameItem,
    Actor,
} from 'a-dirty-trail';
import {
    useExecutePlayerAction,
    usePlayer,
    useWeaponReloadAction,
} from '../contexts/gameContext';
import ItemIcon from './ItemIcon';
import WeaponAmmunition from './WeaponAmmunition';
import Ammunition from './Ammunition';
import useSkillLevelText from '../hooks/useSkillLevelText';
import { Button } from 'react-bootstrap';
import { animated, Transition } from 'react-spring';

const NarrationInventory = () => (
    <article>
        <header>
            <h2>Inventory</h2>
        </header>
        <ListOfItems />
    </article>
);

const ListOfItems = () => {
    const player = usePlayer();
    const inventory = player.inventory;
    const weapons = inventory.getWeapons();
    const ammunitions = inventory.items.filter(
        (item) => item instanceof GameAmmunition
    ) as GameAmmunition[];
    const regularItems = inventory.items.filter(
        (item) =>
            !(item instanceof GameWeapon) && !(item instanceof GameAmmunition)
    );
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
            {ammunitions.map((ammunition) => (
                <li key={ammunition.id}>
                    <Ammunition ammunition={ammunition} />
                </li>
            ))}
            {weapons.map((weapon) => (
                <li key={weapon.id}>
                    <Weapon weapon={weapon} player={player} />
                </li>
            ))}
            {regularItems.map((item) => (
                <li key={item.id}>
                    <Item item={item} />
                </li>
            ))}
        </ul>
    );
};

const Weapon = ({ weapon, player }: { weapon: GameWeapon; player: Actor }) => {
    const skillLevelText = useSkillLevelText(
        player.getSkill(weapon.skillName).level
    );
    return (
        <article>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    justify-content: left;
                `}
            >
                <ItemIcon src={`${weapon.name}.svg`} alt={weapon.name} />
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
                        <span className="text-capitalize">{weapon.name}</span>
                    </dd>

                    <dt className="col-sm-3">Damage</dt>
                    <dd className="col-sm-9">
                        {weapon.minDamage}-{weapon.maxDamage}
                    </dd>

                    <dt className="col-sm-3">Skill level</dt>
                    <dd className="col-sm-9">{skillLevelText}</dd>

                    {weapon.ammunition && (
                        <>
                            <dt className="col-sm-3">Ammunition</dt>
                            <dd className="col-sm-9">
                                <WeaponAmmunition
                                    ammunition={weapon.ammunition}
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

const Item = ({ item }: { item: GameItem }) => {
    return <strong>{item.name}</strong>;
};

const ReloadWeaponButton = ({ weapon }: { weapon: GameWeapon }) => {
    const reloadAction = useWeaponReloadAction(weapon);
    const executePlayerAction = useExecutePlayerAction();
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
            {(style, action) => (
                <animated.div style={style}>
                    <Button
                        variant="outline-dark"
                        block
                        size="sm"
                        onClick={() => executePlayerAction(action)}
                    >
                        Reload
                    </Button>
                </animated.div>
            )}
        </Transition>
    );
};

export default NarrationInventory;
