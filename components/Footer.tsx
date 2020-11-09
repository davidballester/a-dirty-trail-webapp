import React, { ReactElement } from 'react';
import { css } from 'emotion';
import AboutButton from './AboutButton';
import SocialIcons from './SocialIcons';
import CookiesButton from './CookiesButton';

const Footer = (): ReactElement => {
    return (
        <footer
            className={css`
                height: 2rem;
                position: absolute;
                bottom: 1rem;
                left: 0;
                width: 100%;
            `}
        >
            <div
                className={
                    'd-flex align-items-center ' +
                    css`
                        margin: auto;
                        max-width: 600px;
                        padding: 0 2rem;
                    `
                }
            >
                <AboutButton />
                <CookiesButton />
                <div className="flex-grow-1" />
                <SocialIcons />
            </div>
        </footer>
    );
};

export default Footer;
