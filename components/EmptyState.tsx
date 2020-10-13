import React from 'react';
import { css } from 'emotion';

const EmptyState = () => {
    const emptyStateIconSrc = `empty-state-${
        Math.floor(Math.random() * 6) + 1
    }.svg`;
    return (
        <div
            className={css`
                padding: 2rem;
            `}
        >
            <img src={emptyStateIconSrc} />
        </div>
    );
};

export default EmptyState;
