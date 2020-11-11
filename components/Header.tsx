import React, { ReactElement } from 'react';
import { css } from 'emotion';
import MainTitle from './MainTitle';
import Settings from './Settings';

const Header = (): ReactElement => (
    <header
        className={css`
            position: sticky;
        `}
    >
        <MainTitle />
        <div
            className={css`
                position: absolute;
                right: 0.5rem;
                top: 50%;
                transform: translateY(-50%);
                @media (max-width: 900px) {
                    margin-right: -1.5rem;
                }
            `}
        >
            <Settings />
        </div>
    </header>
);

export default Header;
