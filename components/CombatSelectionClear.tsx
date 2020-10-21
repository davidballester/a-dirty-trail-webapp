import React from 'react';
import { Button } from 'react-bootstrap';
import { Spring, animated } from 'react-spring';
import {
    useClearSelection,
    useActionType,
} from '../contexts/combatActionSelectionContext';

const CombatSelectionClear = () => {
    const clearSelection = useClearSelection();
    const actionType = useActionType();
    return (
        <Spring
            from={{ opacity: !!actionType ? 0 : 1 }}
            to={{ opacity: !!actionType ? 1 : 0 }}
        >
            {(style) => (
                <animated.div style={style as any}>
                    <Button
                        variant="outline-dark"
                        onClick={() => clearSelection()}
                        block
                        size="sm"
                    >
                        Reset
                    </Button>
                </animated.div>
            )}
        </Spring>
    );
};

export default CombatSelectionClear;
