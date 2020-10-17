import React from 'react';
import { css } from 'emotion';
import { usePlayer, usePlayerActions } from '../contexts/gameContext';
import Health from './Health';
import { Actor, Ammunition, AttackAction } from 'a-dirty-trail';
import { Button } from 'react-bootstrap';
import useOponentPortraitSrc from '../hooks/useOponentPortraitSrc';
import Weapon from './Weapon';

const PlayerArea = () => {
    const player = usePlayer();
    if (!player) {
        return null;
    }
    return (
        <section
            className={css`
                padding: 2rem;
            `}
        >
            <PlayerActions />
            <div
                className={css`
                    display: flex;
                `}
            >
                <div
                    className={css`
                        margin-right: 1rem;
                    `}
                >
                    <div
                        className={css`
                            margin-bottom: 1rem;
                        `}
                    >
                        <PlayerHealth player={player} />
                    </div>
                    <PlayerAmmunitions player={player} />
                </div>
                <div
                    className={css`
                        flex-grow: 1;
                    `}
                >
                    <PlayerWeapons player={player} />
                </div>
            </div>
        </section>
    );
};

const PlayerActions = () => {
    const playerActions = usePlayerActions();
    const attackActions = playerActions.filter(
        (playerAction) => playerAction instanceof AttackAction
    );
    return (
        <section>
            <ul
                className={
                    'list-unstyled ' +
                    css`
                        > li {
                            margin-bottom: 0.5rem;
                        }
                    `
                }
            >
                {attackActions.map((attackAction) => (
                    <li key={attackAction.id}>
                        <PlayerAction action={attackAction as AttackAction} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

const PlayerAction = ({ action }: { action: AttackAction }) => {
    const oponentPortraitSrc = useOponentPortraitSrc(action.oponent.id);
    return (
        <Button
            variant="outline-dark"
            block
            title={`Attack ${action.oponent.name} with ${action.weapon.name}`}
            className={css`
                > img {
                    height: 1.5rem;
                    :first-child {
                        margin-right: 1rem;
                    }
                }
            `}
        >
            <img
                src={`${action.weapon.name}-outlined.svg`}
                alt={action.weapon.name}
            />
            <img src={oponentPortraitSrc} alt={action.oponent.name} />
        </Button>
    );
};

const PlayerHealth = ({ player }: { player: Actor }) => (
    <section>
        <header>
            <h3>Health</h3>
        </header>
        <Health
            health={player.health}
            iconClassName={css`
                height: 3rem;
            `}
        />
    </section>
);

const PlayerWeapons = ({ player }: { player: Actor }) => {
    const weapons = player.inventory.getWeapons();
    return (
        <section>
            <header>
                <h3>Weapons</h3>
            </header>
            <ul className="list-unstyled">
                {weapons.map((weapon) => (
                    <li key={weapon.id}>
                        <Weapon weapon={weapon} player={player} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

const PlayerAmmunitions = ({ player }: { player: Actor }) => {
    const ammunitions = player.inventory.items.filter(
        (item) => item instanceof Ammunition
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
                        <PlayerAmmunition
                            ammunition={ammunition as Ammunition}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

const OutOfAmmunitions = () => <h3>Out of ammo!</h3>;

const PlayerAmmunition = ({ ammunition }: { ammunition: Ammunition }) => (
    <figure
        className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
        `}
    >
        <img
            src={`${ammunition.name}-outlined-empty.svg`}
            alt={ammunition.name}
            title={`You have ${ammunition.quantity} extra ${ammunition.name}`}
            className={css`
                height: 3rem;
            `}
        />
        <figcaption
            className={css`
                padding-top: 0.25rem;
                font-weight: bold;
                font-size: 1.5rem;
            `}
        >
            {ammunition.quantity}
        </figcaption>
    </figure>
);

export default PlayerArea;
