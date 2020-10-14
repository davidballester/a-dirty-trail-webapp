import React from 'react';
import { css } from 'emotion';
import { NonPlayableActor } from 'a-dirty-trail';
import useRandomColor from '../hooks/useRandomColor';
import Health from './Health';
import Weapon from './Weapon';

const HostileActor = ({ hostileActor }: { hostileActor: NonPlayableActor }) => {
    const actorColor = useRandomColor(hostileActor.id);
    return (
        <article
            className={css`
                padding: 0.5rem;
            `}
        >
            <header
                className={css`
                    display: flex;
                    align-items: center;
                    text-transform: capitalize;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid ${actorColor.background};
                `}
            >
                <div
                    className={css`
                        width: 1rem;
                        height: 1rem;
                        border-radius: 2px;
                        background: ${actorColor.background};
                        margin-right: 0.5rem;
                    `}
                ></div>
                <h3
                    className={css`
                        margin-bottom: 0;
                        flex-grow: 1;
                    `}
                >
                    {hostileActor.name}
                </h3>
                <Health health={hostileActor.health} />
            </header>
            <ul className="list-unstyled">
                {hostileActor.inventory.getWeapons().map((weapon) => (
                    <li key={weapon.id}>
                        <Weapon
                            weapon={weapon}
                            skillLevel={
                                hostileActor.getSkill(weapon.skillName).level
                            }
                        />
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default HostileActor;
