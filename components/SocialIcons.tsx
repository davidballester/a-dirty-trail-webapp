import React, { ReactElement } from 'react';
import { css } from 'emotion';

const SocialIcons = (): ReactElement => (
    <ul
        className={
            'list-unstyled d-flex justify-content-center ' +
            css`
                img {
                    height: 1.5rem;
                }
            `
        }
    >
        <li>
            <a href="https://github.com/davidballester/a-dirty-trail-webapp">
                <img src="github.svg" alt="GitHub" title="GitHub" />
            </a>
        </li>
    </ul>
);

export default SocialIcons;
