import React, { ReactElement } from 'react';
import { css } from 'emotion';

interface QuantityOutOfMaxProps {
    current: number;
    max: number;
    iconSrc: string;
    emptyIconSrc: string;
    alt: string;
    iconClassName?: string;
}
const QuantityOutOfMax = ({
    current,
    max,
    iconSrc,
    emptyIconSrc,
    alt,
    iconClassName = '',
}: QuantityOutOfMaxProps): ReactElement => {
    const icons = new Array(max).fill(null).map((_, index) => (
        <img
            key={index}
            src={index >= current ? emptyIconSrc : iconSrc}
            alt={index === 0 ? alt : ''}
            className={
                css`
                    height: 1.2rem;
                ` +
                ' ' +
                (iconClassName || 'mr-1')
            }
        />
    ));
    return (
        <div
            className={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: left;
            `}
        >
            {icons}
        </div>
    );
};

export default QuantityOutOfMax;
