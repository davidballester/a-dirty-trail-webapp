import React, { ReactElement } from 'react';
import { css } from 'emotion';
import MainTitle from './MainTitle';

const Header = (): ReactElement => (
    <header
        className={css`
            @media (max-width: 900px) {
                display: none;
            }
        `}
    >
        <MainTitle />
    </header>
);

export default Header;
