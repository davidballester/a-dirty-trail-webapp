import React from 'react';
import { css } from 'emotion';
import { animated } from 'react-spring';
import useFadeIn from '../hooks/useFadeIn';

const MainTitle = (): React.ReactElement => {
    const fadeInProps = useFadeIn();
    return (
        <animated.div style={fadeInProps}>
            <h1
                className={css`
                    font-size: 50px;
                    text-align: center;
                    margin: 0;
                    padding: 2rem;
                `}
            >
                A dirty trail
            </h1>
        </animated.div>
    );
};

export default MainTitle;
