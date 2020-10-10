import React from 'react';
import { Health as GameHealth } from 'a-dirty-trail';

const Health = ({ health }: { health: GameHealth }) => (
    <p>
        {health.currentHitpoints} / {health.maxHitpoints} hitpoints
    </p>
);

export default Health;
