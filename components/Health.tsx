import React from 'react';
import { Health as GameHealth } from 'a-dirty-trail';
import QuantityOutOfMax from './QuantityOutOfMax';

const Health = ({ health }: { health: GameHealth }) => (
    <QuantityOutOfMax
        iconSrc="/health.svg"
        emptyIconSrc="/health-empty.svg"
        current={health.currentHitpoints}
        max={health.maxHitpoints}
        alt={`${health.currentHitpoints} hitpoints out of ${health.maxHitpoints}`}
    />
);

export default Health;
