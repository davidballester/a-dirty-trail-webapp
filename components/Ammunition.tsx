import React, { ReactElement } from 'react';
import { css } from 'emotion';
import ItemIcon from './ItemIcon';

const Ammunition = ({
    type,
    quantity,
}: {
    type: string;
    quantity: number;
}): ReactElement => (
    <article
        className={css`
            display: flex;
            align-items: center;
            justify-content: left;
        `}
    >
        <ItemIcon src={`${type}-empty.svg`} alt={type} />
        <strong
            className={css`
                font-size: 1.2rem;
            `}
        >
            x {quantity}
        </strong>
    </article>
);

export default Ammunition;
