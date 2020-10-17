import React from 'react';

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
];

const IconsAttribution = () => (
    <section>
        <div>
            Icons made by{' '}
            {iconMakers.map(({ link, name }, index) => (
                <>
                    <a key={name} href={link} title={name}>
                        {name}
                    </a>
                    {index < iconMakers.length - 2 && <span>, </span>}
                    {index === iconMakers.length - 2 && <span> and </span>}
                </>
            ))}
            {' from '}
            <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
            </a>
        </div>
    </section>
);

export default IconsAttribution;
