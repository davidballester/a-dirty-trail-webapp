import React, { ReactElement } from 'react';
import { css } from 'emotion';

const ItemIcon = ({ src, alt }: { src: string; alt: string }): ReactElement => (
    <img
        src={src}
        alt={alt}
        className={css`
            width: 2rem;
            margin-right: 0.5rem;
            @media (min-width: 900px) {
                width: 3rem;
                margin-right: 1rem;
            }
        `}
    />
);

export default ItemIcon;
