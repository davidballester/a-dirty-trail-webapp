import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';
import { animated, Transition } from 'react-spring';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';
import { useScene } from '../contexts/narrationContext';
import { useNarrativeSceneEngine } from '../contexts/narrativeSceneEngineContext';
import GameAdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import ReactMarkdown from 'react-markdown';

const NarrationPlayerActions = (): ReactElement => {
    const scene = useScene();
    const narrativeSceneEngine = useNarrativeSceneEngine();
    const playerActions = narrativeSceneEngine
        .getPlayerActions()
        .getAdvanceActions();
    const isCombat = scene.isCombat();
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
                items={[...playerActions, { isCombat }]}
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
                        {!(action instanceof GameAdvanceAction) &&
                            action.isCombat && <GoToCombatAction />}
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
    const narrativeSceneEngine = useNarrativeSceneEngine();
    return (
        <Button
            variant="outline-dark"
            onClick={() => {
                narrativeSceneEngine.executePlayerAction(action);
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

const GoToCombatAction = (): ReactElement => {
    const toggleGameViewMode = useToggleGameViewMode();
    return (
        <Button
            variant="dark"
            onClick={() => toggleGameViewMode()}
            block
            className={css`
                margin-bottom: 0.5rem;
            `}
        >
            Combat!
        </Button>
    );
};
