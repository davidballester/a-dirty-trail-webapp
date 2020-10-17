import React from 'react';
import { css } from 'emotion';
import {
    Weapon as GameWeapon,
    Ammunition as GameAmmunition,
    Item as GameItem,
} from 'a-dirty-trail';
import { usePlayer } from '../contexts/gameContext';
import ItemIcon from './ItemIcon';
import Weapon from './Weapon';

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

const Ammunition = ({ ammunition }: { ammunition: GameAmmunition }) => (
    <article
        className={css`
            display: flex;
            align-items: center;
            justify-content: left;
        `}
    >
        <ItemIcon
            src={`${ammunition.name}-outlined-empty.svg`}
            alt={ammunition.name}
        />
        <strong
            className={css`
                font-size: 1.2rem;
            `}
        >
            x {ammunition.quantity}
        </strong>
    </article>
);

const Item = ({ item }: { item: GameItem }) => {
    return <strong>{item.name}</strong>;
};

export default NarrationInventory;
