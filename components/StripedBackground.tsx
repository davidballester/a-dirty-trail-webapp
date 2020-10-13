import React from 'react';
import { css } from 'emotion';

const StripedBackground = () => (
    <div
        className={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: repeating-linear-gradient(
                45deg,
                var(--danger),
                var(--danger) 10px,
                transparent 10px,
                transparent 20px
            );
            opacity: 0.3;
        `}
    ></div>
);

export default StripedBackground;
