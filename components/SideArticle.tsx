import React from 'react';
import { css } from 'emotion';

const SideArticle = ({
    children,
    even,
}: {
    children: React.ReactElement | React.ReactElement[];
    even: boolean;
}) => (
    <article
        className={css`
            > header {
                text-align: center;
                border-bottom: 1px solid var(--dark);
                margin-bottom: 1rem;
            }
            padding: 1rem;
            ${even ? 'background-color: var(--light);' : ''}
        `}
    >
        {children}
    </article>
);

export default SideArticle;
