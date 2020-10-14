import React from 'react';
import { css } from 'emotion';
import { Weapon as GameWeapon, Ammunition, SkillLevel } from 'a-dirty-trail';
import QuantityOutOfMax from './QuantityOutOfMax';
import useAmmunitionIconName from '../hooks/useAmmunitionIconName';
import useWeaponIconSrc from '../hooks/useWeaponIconSrc';
import { SkillLevelBadge } from './SkillLevel';
import useRandomColor from '../hooks/useRandomColor';

export const WeaponLoadedAmmunition = ({
    ammunition,
}: {
    ammunition: Ammunition;
}) => {
    const ammunitionIconName = useAmmunitionIconName(
        ammunition ? ammunition.name : null
    );
    if (!ammunition) {
        return null;
    }

    return (
        <QuantityOutOfMax
            iconSrc={`${ammunitionIconName}.svg`}
            emptyIconSrc={`${ammunitionIconName}-empty.svg`}
            alt={`${ammunition.quantity} out of ${ammunition.maxAmmunition} ${ammunition.name}`}
            current={ammunition.quantity}
            max={ammunition.maxAmmunition}
            iconClassName={css`
                margin-left: -0.4rem;
            `}
        />
    );
};

const Weapon = ({
    weapon,
    skillLevel,
}: {
    weapon: GameWeapon;
    skillLevel: SkillLevel;
}) => {
    const iconSrc = useWeaponIconSrc(weapon.name);
    const color = useRandomColor(weapon.id);
    return (
        <article
            className={css`
                display: flex;
                align-items: center;
            `}
        >
            <div
                className={
                    css`
                        padding: 0.5rem;
                        width: 4rem;
                        height: 4rem;
                        border-radius: 50%;
                        background: ${color.background};
                        color: ${color.textOverBackground};
                        position: relative;
                    ` + ' mr-3'
                }
            >
                <img
                    src={iconSrc}
                    alt={weapon.name}
                    className={css`
                        width: 100%;
                    `}
                />
                <div
                    className={css`
                        position: absolute;
                        font-size: 0.8rem;
                        bottom: -0.25rem;
                        right: -0.25rem;
                        background: var(--light);
                        color: var(--dark);
                        font-weight: bold;
                        border-radius: 50%;
                        padding: 0.25rem;
                        box-shadow: 0 0 2px var(--dark);
                    `}
                >
                    {`${weapon.minDamage}-${weapon.maxDamage}`}
                </div>
            </div>
            <div>
                <div>
                    <strong className="text-capitalize">{weapon.name}</strong>
                </div>
                <div
                    className={css`
                        margin-bottom: 0.25rem;
                    `}
                >
                    <SkillLevelBadge
                        id={`skillLevel-${weapon.id}-${skillLevel}`}
                        skillLevel={skillLevel}
                    />
                </div>
                <WeaponLoadedAmmunition ammunition={weapon.ammunition} />
            </div>
        </article>
    );
};

export default Weapon;
