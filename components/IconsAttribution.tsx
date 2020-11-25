import React, { ReactElement, Fragment } from 'react';

const iconMakers = [
    {
        link: 'https://www.flaticon.com/authors/freepik',
        name: 'Freepik',
    },
    {
        link: 'https://www.flaticon.es/icono-gratis/mochila_1127906',
        name: 'prettycons',
    },
    {
        link: 'https://www.flaticon.es/icono-gratis/mujer_3169043',
        name: 'Linector',
    },
    {
        link: 'https://www.flaticon.com/authors/smashicons',
        name: 'Smashicons',
    },
    {
        link: 'https://www.flaticon.es/autores/prosymbols',
        name: 'Prosymbols',
    },
    {
        link: 'https://www.flaticon.com/authors/those-icons',
        name: 'Those icons',
    },
];

const IconsAttribution = (): ReactElement => (
    <p>
        Icons made by{' '}
        {iconMakers.map(({ link, name }, index) => (
            <Fragment key={link}>
                <a key={name} href={link} title={name}>
                    {name}
                </a>
                {index < iconMakers.length - 2 && <span>, </span>}
                {index === iconMakers.length - 2 && <span> and </span>}
            </Fragment>
        ))}
        {' from '}
        <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
        </a>
    </p>
);

export default IconsAttribution;
