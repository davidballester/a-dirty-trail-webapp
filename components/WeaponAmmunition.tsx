import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Ammunition } from 'a-dirty-trail';
import QuantityOutOfMax from './QuantityOutOfMax';

const WeaponAmmunition = ({
    ammunition,
}: {
    ammunition: Ammunition;
}): ReactElement => (
    <QuantityOutOfMax
        iconSrc={`${ammunition.name}.svg`}
        emptyIconSrc={`${ammunition.name}-empty.svg`}
        alt={`${ammunition.quantity} out of ${ammunition.maxAmmunition} ${ammunition.name}`}
        current={ammunition.quantity}
        max={ammunition.maxAmmunition}
        iconClassName={css`
            margin-left: -0.4rem;
        `}
    />
);

export default WeaponAmmunition;
