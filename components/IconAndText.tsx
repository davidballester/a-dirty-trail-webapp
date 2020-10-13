import React from 'react';
import { css } from 'emotion';

interface IconAndTextProps {
    iconSize: 'large' | 'medium' | 'small';
    iconSrc: string;
    iconAlt: string;
    textSize: 'large' | 'medium' | 'small';
    children: React.ReactElement | React.ReactElement[];
}
const IconAndText = ({
    iconSize,
    iconSrc,
    iconAlt,
    textSize,
    children,
}: IconAndTextProps) => {
    let iconWidth = '2rem';
    let iconMarginRight = 'mr-2';
    if (iconSize === 'large') {
        iconWidth = '3rem';
        iconMarginRight = 'mr-3';
    } else if (iconSize === 'small') {
        iconWidth = '1.2rem';
        iconMarginRight = 'mr-1';
    }
    let textFontSize = '1.2rem';
    if (textSize === 'large') {
        textFontSize = '1.5rem';
    } else if (textSize === 'small') {
        textFontSize = '1rem';
    }
    return (
        <div
            className={css`
                display: flex;
                align-items: center;
                justify-content: left;
            `}
        >
            <img
                src={iconSrc}
                alt={iconAlt}
                className={
                    css`
                        width: ${iconWidth};
                    ` + ` ${iconMarginRight}`
                }
            />
            <div
                className={css`
                    text-transform: capitalize;
                    font-size: ${textFontSize};
                    width: 100%;
                `}
            >
                {children}
            </div>
        </div>
    );
};

export default IconAndText;
