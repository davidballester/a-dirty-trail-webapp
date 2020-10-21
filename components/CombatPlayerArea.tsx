import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { usePlayer } from '../contexts/gameContext';
import Health from './Health';
import { Actor, Ammunition as GameAmmunition } from 'a-dirty-trail';
import Ammunition from './Ammunition';

const CombatPlayerArea = (): ReactElement => {
    const player = usePlayer();
    if (!player) {
        return null;
    }
    return (
        <section>
            <div
                className={css`
                    display: flex;
                    > * {
                        width: 50%;
                    }
                    > :first-child {
                        margin-right: 1rem;
                    }
                `}
            >
                <PlayerHealth player={player} />
                <PlayerAmmunitions player={player} />
            </div>
        </section>
    );
};
const PlayerHealth = ({ player }: { player: Actor }): ReactElement => (
    <section>
        <header>
            <h3>Health</h3>
        </header>
        <Health
            health={player.health}
            iconClassName={css`
                height: 3rem !important;
            `}
        />
    </section>
);

const PlayerAmmunitions = ({ player }: { player: Actor }): ReactElement => {
    const ammunitions = player.inventory.items.filter(
        (item) => item instanceof GameAmmunition
    );
    if (!ammunitions) {
        return <OutOfAmmunitions />;
    }
    return (
        <section>
            <header>
                <h3>Ammunitions</h3>
            </header>
            <ul
                className={
                    'list-unstyled ' +
                    css`
                        display: flex;
                        justify-content: left;
                        align-items: center;
                    `
                }
            >
                {ammunitions.map((ammunition) => (
                    <li key={ammunition.id}>
                        <Ammunition ammunition={ammunition as GameAmmunition} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

const OutOfAmmunitions = (): ReactElement => <h3>Out of ammo!</h3>;

export default CombatPlayerArea;
