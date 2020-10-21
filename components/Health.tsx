import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Health as GameHealth } from 'a-dirty-trail';
import QuantityOutOfMax from './QuantityOutOfMax';

const Health = ({
    health,
    iconClassName = '',
}: {
    health: GameHealth;
    iconClassName?: string;
}): ReactElement => (
    <QuantityOutOfMax
        iconSrc="/health.svg"
        emptyIconSrc="/health-empty.svg"
        current={health.currentHitpoints}
        max={health.maxHitpoints}
        alt={`${health.currentHitpoints} hitpoints out of ${health.maxHitpoints}`}
        iconClassName={
            css`
                height: 2rem;
            ` +
            ' ' +
            iconClassName
        }
    />
);

export default Health;
