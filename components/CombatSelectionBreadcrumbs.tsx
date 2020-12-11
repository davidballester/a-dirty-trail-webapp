import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Transition, animated } from 'react-spring';
import useBreadcrumbText from '../hooks/useCombatBreadcrumbText';

const CombatSelectionBreadcrumb = (): ReactElement => {
    const breadcrumbText = useBreadcrumbText();
    return (
        <div
            className={css`
                position: relative;
                padding-bottom: 2rem;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}
        >
            <Transition
                items={breadcrumbText}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
            >
                {(style) => (
                    <animated.div
                        style={style as any}
                        className="absolute-top-left"
                    >
                        <h6>{breadcrumbText}</h6>
                    </animated.div>
                )}
            </Transition>
        </div>
    );
};

export default CombatSelectionBreadcrumb;
