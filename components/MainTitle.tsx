import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { useNarration } from '../contexts/narrationContext';

const MainTitle = (): ReactElement => {
    const narration = useNarration();
    const title = narration ? narration.getTitle() : 'A dirty trail';
    return (
        <h1
            className={css`
                font-size: 35px;
                text-align: center;
                margin: 0;
                padding: 2rem;
                text-transform: capitalize;
            `}
        >
            <span
                className={css`
                    border-bottom: 0.2rem solid var(--dark);
                `}
            >
                {title.replace('_', ' ')}
            </span>
        </h1>
    );
};

export default MainTitle;
