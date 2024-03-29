import React, { ReactElement } from 'react';
import { css } from 'emotion';

const NarrationInventoryItemIcon = ({
    src,
    alt,
}: {
    src: string;
    alt: string;
}): ReactElement => (
    <img
        src={src}
        alt={alt}
        className={css`
            width: 3rem;
            margin-right: 1rem;
        `}
    />
);

export default NarrationInventoryItemIcon;
