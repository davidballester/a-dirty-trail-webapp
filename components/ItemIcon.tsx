import React from 'react';
import { css } from 'emotion';

const ItemIcon = ({ src, alt }: { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        className={css`
            width: 3rem;
            margin-right: 1rem;
        `}
    />
);

export default ItemIcon;
