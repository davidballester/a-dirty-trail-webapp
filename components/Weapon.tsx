import React from 'react';
import { css } from 'emotion';
import { Actor, Weapon as GameWeapon, Ammunition } from 'a-dirty-trail';
import useSkillLevelText from '../hooks/useSkillLevelText';
import QuantityOutOfMax from './QuantityOutOfMax';
import ItemIcon from './ItemIcon';

const Weapon = ({ weapon, player }: { weapon: GameWeapon; player: Actor }) => {
    const skillLevelText = useSkillLevelText(
        player.getSkill(weapon.skillName).level
    );
    return (
        <article
            className={css`
                display: flex;
                align-items: center;
                justify-content: left;
            `}
        >
            <ItemIcon src={`${weapon.name}-outlined.svg`} alt={weapon.name} />
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
                            <WeaponAmmunition ammunition={weapon.ammunition} />
                        </dd>
                    </>
                )}
            </dl>
        </article>
    );
};

export default Weapon;

const WeaponAmmunition = ({ ammunition }: { ammunition: Ammunition }) => (
    <QuantityOutOfMax
        iconSrc={`${ammunition.name}-outlined.svg`}
        emptyIconSrc={`${ammunition.name}-outlined-empty.svg`}
        alt={`${ammunition.quantity} out of ${ammunition.maxAmmunition} ${ammunition.name}`}
        current={ammunition.quantity}
        max={ammunition.maxAmmunition}
        iconClassName={css`
            margin-left: -0.4rem;
        `}
    />
);
