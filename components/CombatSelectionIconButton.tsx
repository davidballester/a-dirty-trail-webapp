import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';

const CombatSelectionIconButton = ({
    iconSrc,
    icon,
    name,
    onClick,
    children,
    caption = true,
}: {
    iconSrc?: string;
    icon?: ReactElement;
    name: string;
    onClick: () => void;
    children?: ReactElement | ReactElement[];
    caption?: boolean;
}): ReactElement => (
    <Button
        variant="outline-dark"
        onClick={onClick}
        block
        className={css`
            min-height: 100%;
            :hover,
            :focus,
            :active {
                background-color: #ccc !important;
                color: var(--dark) !important;
            }
        `}
    >
        <figure
            className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 0;
                > img {
                    width: 80%;
                }
                > figcaption {
                    font-weight: bold;
                }
            `}
        >
            {iconSrc ? <img src={iconSrc} alt={name} /> : null}
            {icon ? icon : null}
            {children}
            {caption ? (
                <figcaption className="text-capitalize">{name}</figcaption>
            ) : null}
        </figure>
    </Button>
);

export default CombatSelectionIconButton;
