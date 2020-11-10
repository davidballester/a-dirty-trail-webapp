import React, { ReactElement } from 'react';
import { css } from 'emotion';
import Health from './Health';
import Ammunition from './Ammunition';
import { usePlayer } from '../contexts/combatSceneEngineContext';
import Actor from 'a-dirty-trail/build/core/Actor';

const CombatPlayerArea = (): ReactElement => {
    const player = usePlayer();
    if (!player) {
        return null;
    }
    return (
        <section>
            <PlayerHealth player={player} />
            <PlayerAmmunitions player={player} />
        </section>
    );
};
const PlayerHealth = ({ player }: { player: Actor }): ReactElement => (
    <section>
        <header>
            <h3>Health</h3>
        </header>
        <Health
            health={player.getHealth()}
            iconClassName={css`
                height: 2rem !important;
                @media (min-width: 900px) {
                    height: 3rem !important;
                }
            `}
        />
    </section>
);

const PlayerAmmunitions = ({ player }: { player: Actor }): ReactElement => {
    const ammunitionsByType = player.getInventory().getAmmunitionsByType();
    const ammunitionTypes = Object.keys(ammunitionsByType);
    return (
        <section
            className={css`
                margin-top: 1rem;
            `}
        >
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
                {ammunitionTypes.map((ammunitionType) => (
                    <li key={ammunitionType}>
                        <Ammunition
                            type={ammunitionType}
                            quantity={ammunitionsByType[ammunitionType]}
                        />
                    </li>
                ))}
                {!ammunitionTypes.length ? (
                    <li>
                        <h4
                            className={css`
                                line-height: calc(32px - 0.5rem);
                            `}
                        >
                            Out of ammunition!
                        </h4>
                    </li>
                ) : null}
            </ul>
        </section>
    );
};

export default CombatPlayerArea;
