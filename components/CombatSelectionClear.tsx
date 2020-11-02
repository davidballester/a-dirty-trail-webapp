import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';
import { Spring, animated } from 'react-spring';
import {
    useClearSelection,
    useActionType,
} from '../contexts/combatActionSelectionContext';

const CombatSelectionClear = (): ReactElement => {
    const actionType = useActionType();
    return (
        <Spring
            from={{ opacity: !!actionType ? 0 : 1 }}
            to={{ opacity: !!actionType ? 1 : 0 }}
        >
            {(style) => (
                <animated.div style={style as any}>
                    <CombatSelectionButton />
                </animated.div>
            )}
        </Spring>
    );
};

export default CombatSelectionClear;

const CombatSelectionButton = (): ReactElement => {
    const clearSelection = useClearSelection();
    return (
        <div
            className={css`
                width: 33%;
                padding: 0.5rem;
                margin: auto;
                display: flex;
                justify-content: center;
            `}
        >
            <Button
                variant="outline-dark"
                onClick={() => clearSelection()}
                block
            >
                Reset
            </Button>
        </div>
    );
};
