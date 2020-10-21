import React, { ReactElement } from 'react';
import { css } from 'emotion';
import MainTitle from './MainTitle';

const Header = (): ReactElement => (
    <header
        className={css`
            position: sticky;
        `}
    >
        <MainTitle />
    </header>
);

export default Header;
