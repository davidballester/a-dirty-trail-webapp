import React from 'react';
import { css } from 'emotion';
import { Ammunition } from 'a-dirty-trail';
import QuantityOutOfMax from './QuantityOutOfMax';

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

export default WeaponAmmunition;
