import React from 'react';
import { css } from 'emotion';
import {
    usePlayerActions,
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
import { animated, useTransition } from 'react-spring';
import useIsCombat from '../hooks/useIsCombat';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';

const NarrationPlayerActions = () => {
    const isCombat = useIsCombat();
    const playerActions = usePlayerActions();
    const playerActionsTransition = usePlayerActionsTransition(playerActions);
    const isCombatTransition = usePlayerActionsTransition(isCombat);
    if (!playerActions.length) {
        return null;
    }
    return (
        <section
            className={css`
                padding-top: 1rem;
                > div {
                    will-change: opacity, translate;
                }
            `}
        >
            {!isCombat &&
                playerActionsTransition((style, playerAction) => (
                    <animated.div style={style as any}>
                        <PlayerAction action={playerAction} />
                    </animated.div>
                ))}
            {isCombat &&
                isCombatTransition((style) => (
                    <animated.div style={style as any}>
                        <GoToCombatAction />
                    </animated.div>
                ))}
        </section>
    );
};

export default NarrationPlayerActions;

const usePlayerActionsTransition = (items) => {
    return useTransition(items, {
        from: {
            opacity: 0,
            transform: 'translate3d(0, 40px, 0)',
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(0, 0px, 0)',
        },
    });
};

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
