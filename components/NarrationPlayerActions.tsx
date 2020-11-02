import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';
import { animated, Transition } from 'react-spring';
import {
    useExecutePlayerAction,
    useNarrativeSceneEngine,
} from '../contexts/narrativeSceneEngineContext';
import GameAdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import ReactMarkdown from 'react-markdown';

const NarrationPlayerActions = (): ReactElement => {
    const narrativeSceneEngine = useNarrativeSceneEngine();
    const playerActions = narrativeSceneEngine
        .getPlayerActions()
        .getAdvanceActions();
    return (
        <section
            className={css`
                padding-top: 1rem;
                > div {
                    will-change: opacity, translate;
                }
            `}
        >
            <Transition
                items={[...playerActions]}
                from={{
                    opacity: 0,
                    transform: 'translate3d(0, 40px, 0)',
                }}
                enter={{
                    opacity: 1,
                    transform: 'translate3d(0, 0px, 0)',
                }}
            >
                {(style, action) => (
                    <animated.div style={style}>
                        {action instanceof GameAdvanceAction && (
                            <AdvanceAction action={action} />
                        )}
                    </animated.div>
                )}
            </Transition>
        </section>
    );
};

export default NarrationPlayerActions;

const AdvanceAction = ({
    action,
}: {
    action: GameAdvanceAction;
}): ReactElement => {
    const executePlayerAction = useExecutePlayerAction();
    return (
        <Button
            variant="outline-dark"
            onClick={() => {
                executePlayerAction(action);
            }}
            block
            className={css`
                margin-bottom: 0.5rem;
            `}
        >
            <ReactMarkdown
                className={css`
                    p {
                        margin-bottom: 0;
                    }
                `}
            >
                {action.getName()}
            </ReactMarkdown>
        </Button>
    );
};
