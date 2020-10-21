import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Ammunition as GameAmmunition } from 'a-dirty-trail';
import ItemIcon from './ItemIcon';

const Ammunition = ({
    ammunition,
}: {
    ammunition: GameAmmunition;
}): ReactElement => (
    <article
        className={css`
            display: flex;
            align-items: center;
            justify-content: left;
        `}
    >
        <ItemIcon src={`${ammunition.name}-empty.svg`} alt={ammunition.name} />
        <strong
            className={css`
                font-size: 1.2rem;
            `}
        >
            x {ammunition.quantity}
        </strong>
    </article>
);

export default Ammunition;
