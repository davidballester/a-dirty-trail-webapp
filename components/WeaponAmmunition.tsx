import React, { ReactElement } from 'react';
import { css } from 'emotion';
import QuantityOutOfMax from './QuantityOutOfMax';
import GameWeaponAmmunition from 'a-dirty-trail/build/core/WeaponAmmunition';

const WeaponAmmunition = ({
    ammunition,
}: {
    ammunition: GameWeaponAmmunition;
}): ReactElement => (
    <QuantityOutOfMax
        iconSrc={`${ammunition.getType()}.svg`}
        emptyIconSrc={`${ammunition.getType()}-empty.svg`}
        alt={`${ammunition.getCurrent()} out of ${ammunition.getMax()} ${ammunition.getType()}`}
        current={ammunition.getCurrent()}
        max={ammunition.getMax()}
        iconClassName={css`
            margin-left: -0.4rem;
        `}
    />
);

export default WeaponAmmunition;
