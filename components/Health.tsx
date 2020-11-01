import React, { ReactElement } from 'react';
import { css } from 'emotion';
import GameHealth from 'a-dirty-trail/build/core/Health';
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
        current={health.getCurrent()}
        max={health.getMax()}
        alt={`${health.getCurrent()} hitpoints out of ${health.getMax()}`}
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
