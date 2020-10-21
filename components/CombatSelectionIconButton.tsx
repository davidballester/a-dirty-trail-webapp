import React from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';

const CombatSelectionIconButton = ({
    iconSrc,
    name,
    onClick,
}: {
    iconSrc: string;
    name: string;
    onClick: () => void;
}) => (
    <Button variant="outline-dark" onClick={onClick} block>
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
            `}
        >
            <img src={iconSrc} alt={name} />
            <figcaption className="text-capitalize">{name}</figcaption>
        </figure>
    </Button>
);

export default CombatSelectionIconButton;
