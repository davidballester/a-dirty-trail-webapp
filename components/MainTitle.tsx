import React from 'react';
import { css } from 'emotion';

const MainTitle = (): React.ReactElement => {
    return (
        <h1
            className={css`
                font-size: 50px;
                text-align: center;
                margin: 0;
                padding: 2rem;
            `}
        >
            <span
                className={css`
                    border-bottom: 0.2rem solid var(--dark);
                `}
            >
                A dirty trail
            </span>
        </h1>
    );
};

export default MainTitle;
