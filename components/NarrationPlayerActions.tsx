import React from 'react';
import { css } from 'emotion';
import {
    useNarrationPlayerActions,
    useExecutePlayerAction,
} from '../contexts/gameContext';
import {
    Action,
    AdvanceToActAction,
    AdvanceToSceneAction,
} from 'a-dirty-trail';
import { Button } from 'react-bootstrap';
import useActionVerb from '../hooks/useActionVerb';
import useActionTarget from '../hooks/useActionTarget';
import useActionAuxiliaryTool from '../hooks/useActionAuxiliaryTool';
import { animated, Transition } from 'react-spring';
import useIsCombat from '../hooks/useIsCombat';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';

const NarrationPlayerActions = () => {
    const isCombat = useIsCombat();
    const playerActions = useNarrationPlayerActions();
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
                        {action instanceof Action && (
                            <PlayerAction action={action} />
                        )}
                        {!(action instanceof Action) && action.isCombat && (
                            <GoToCombatAction />
                        )}
                    </animated.div>
                )}
            </Transition>
        </section>
    );
};

export default NarrationPlayerActions;

const PlayerAction = ({ action }: { action: Action }) => {
    const executePlayerAction = useExecutePlayerAction();
    return (
        <Button
            variant="outline-dark"
            onClick={() => executePlayerAction(action)}
            block
            className={css`
                margin-bottom: 0.5rem;
            `}
        >
            <PlayerActionText action={action} />
        </Button>
    );
};

const AdvancePlayerActionText = ({
    action,
}: {
    action: AdvanceToSceneAction | AdvanceToActAction;
}) => <span>{action.getName()}</span>;

const StandardPlayerActionText = ({ action }: { action: Action }) => {
    const actionVerb = useActionVerb(action);
    const actionTarget = useActionTarget(action);
    const auxiliaryTool = useActionAuxiliaryTool(action);
    return (
        <div
            className={css`
                position: relative;
            `}
        >
            <span className="text-capitalize">{actionVerb}</span>
            {!actionTarget ? null : <strong> {actionTarget.name}</strong>}
            {!auxiliaryTool || auxiliaryTool.id === actionTarget.id ? null : (
                <>
                    <span> with </span>
                    <strong>{auxiliaryTool.name}</strong>
                </>
            )}
        </div>
    );
};

const PlayerActionText = ({ action }: { action: Action }) => {
    const isAdvanceAction =
        action instanceof AdvanceToActAction ||
        action instanceof AdvanceToSceneAction;
    if (isAdvanceAction) {
        return (
            <AdvancePlayerActionText
                action={action as AdvanceToActAction | AdvanceToSceneAction}
            />
        );
    }
    return <StandardPlayerActionText action={action} />;
};

const GoToCombatAction = () => {
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
