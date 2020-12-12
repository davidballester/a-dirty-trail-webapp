import React, { ReactElement } from 'react';
import { css } from 'emotion';
import Ammunition from './Ammunition';
import GameWeapon from 'a-dirty-trail/build/core/Weapon';
import GameTrinket, { SkillsModifiers } from 'a-dirty-trail/build/core/Trinket';
import { AmmunitionByType } from 'a-dirty-trail/build/core/Inventory';
import { usePlayer } from '../contexts/narrativeSceneEngineContext';
import NarrationInventoryWeapon from './NarrationInventoryWeapon';
import NarrationInventoryItemIcon from './NarrationInventoryItemIcon';

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

                        @media (max-width: 900px) {
                            border-bottom: 1px solid var(--secondary);
                            :last-child {
                                border-bottom: none;
                            }
                        }
                    }
                `
            }
        >
            <Ammunitions ammunitions={inventory.getAmmunitionsByType()} />
            <Weapons weapons={inventory.getWeapons()} />
            <Trinkets trinkets={inventory.getTrinkets()} />
        </ul>
    );
};

const Weapons = ({ weapons }: { weapons: GameWeapon[] }): ReactElement => (
    <>
        {weapons.map((weapon) => (
            <li key={weapon.getId()}>
                <NarrationInventoryWeapon weapon={weapon} />
            </li>
        ))}
    </>
);

const Ammunitions = ({
    ammunitions,
}: {
    ammunitions: AmmunitionByType;
}): ReactElement => (
    <li
        className={css`
            display: flex;
        `}
    >
        {Object.keys(ammunitions).map((ammunitionType) => (
            <Ammunition
                key={ammunitionType}
                type={ammunitionType}
                quantity={ammunitions[ammunitionType]}
            />
        ))}
    </li>
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
    <div
        className={css`
            display: flex;
            align-items: center;
            justify-content: left;
        `}
    >
        <NarrationInventoryItemIcon src="trinket.svg" alt={trinket.getName()} />
        <p>
            <strong
                className={css`
                    display: block;
                `}
            >
                {trinket.getName()}
            </strong>
            {trinket.getDescription() && (
                <span className="font-italic">{trinket.getDescription()}</span>
            )}
            {Object.keys(trinket.getSkillsModifiers()).length > 0 ? (
                <TrinketSkillModifiers
                    modifiers={trinket.getSkillsModifiers()}
                />
            ) : null}
        </p>
    </div>
);

const TrinketSkillModifiers = ({
    modifiers,
}: {
    modifiers: SkillsModifiers;
}): ReactElement => {
    const text = Object.keys(modifiers)
        .map((skillName) => {
            const modifier = modifiers[skillName];
            return `${modifier > 0 ? '+' : ''}${
                modifier * 100
            }% to ${skillName}`;
        })
        .join(', ');
    return (
        <div>
            <small>
                <strong>{text}</strong>
            </small>
        </div>
    );
};

export default NarrationInventory;
