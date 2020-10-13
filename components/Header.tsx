import React from 'react';
import { css } from 'emotion';
import MainTitle from './MainTitle';

const Header = () => (
    <header
        className={css`
            position: sticky;
        `}
    >
        <MainTitle />
    </header>
);

export default Header;
