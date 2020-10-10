import React from 'react';
import { css } from 'emotion';
import {
    Weapon as GameWeapon,
    Ammunition as GameAmmunition,
    Inventory as GameInventory,
} from 'a-dirty-trail';
import { UnstyledList, UnstyledListItem } from './UnstyledList';

export const Weapon = ({ weapon }: { weapon: GameWeapon }) => (
    <article>
        <strong
            className={css`
                text-transform: capitalize;
                display: block;
            `}
        >
            {weapon.name}
        </strong>
        <span>
            Damage: {weapon.minDamage} - {weapon.maxDamage}
        </span>
        {weapon.ammunition && (
            <span
                className={css`
                    text-transform: capitalize;
                    display: block;
                `}
            >
                {weapon.ammunition!.name}: {weapon.ammunition.quantity} /{' '}
                {weapon.ammunition.maxAmmunition}
            </span>
        )}
    </article>
);

export const Ammunition = ({ ammunition }: { ammunition: GameAmmunition }) => (
    <article>
        <strong
            className={css`
                text-transform: capitalize;
                display: block;
            `}
        >
            {ammunition.name} - {ammunition.quantity}
        </strong>
    </article>
);

const Inventory = ({ inventory }: { inventory: GameInventory }) => (
    <UnstyledList>
        {inventory.items.map((item) => (
            <UnstyledListItem
                key={item.name}
                className={css`
                    margin-bottom: 0.5rem;
                `}
            >
                {item instanceof GameWeapon && <Weapon weapon={item} />}
                {item instanceof GameAmmunition && (
                    <Ammunition ammunition={item} />
                )}
            </UnstyledListItem>
        ))}
    </UnstyledList>
);

export default Inventory;
