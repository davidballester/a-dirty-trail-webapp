import React from 'react';
import { css } from 'emotion';
import About from './About';

const Footer = () => (
    <footer
        className={
            css`
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 5rem;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            ` + ' bg-dark text-light'
        }
    >
        <ul className="list-inline">
            <li className="list-inline-item">
                <About className="text-light" />
            </li>
        </ul>
        <p>David Ballester Mena © {new Date().getFullYear()}</p>
    </footer>
);

export default Footer;
