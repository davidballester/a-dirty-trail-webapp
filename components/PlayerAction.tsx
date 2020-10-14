import React from 'react';
import { css } from 'emotion';
import {
    Action,
    AdvanceToActAction,
    AdvanceToSceneAction,
} from 'a-dirty-trail';
import {
    selectPlayerAction,
    useGameDispatch,
    useGameState,
} from '../contexts/gameContext';
import { Button } from 'react-bootstrap';
import useActionVariant from '../hooks/useActionVariant';
import useActionVerb from '../hooks/useActionVerb';
import useActionTarget from '../hooks/useActionTarget';
import useActionAuxiliaryTool from '../hooks/useActionAuxiliaryTool';
import useWeaponIconSrc from '../hooks/useWeaponIconSrc';

const AdvancePlayerActionText = ({
    action,
}: {
    action: AdvanceToSceneAction | AdvanceToActAction;
}) => <span>{action.getName()}</span>;

const WeaponIcon = ({ src, alt }: { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        className={css`
            position: absolute;
            left: 1rem;
            top: 0;
            height: 1.5rem;
        `}
    />
);

const StandardPlayerActionText = ({ action }: { action: Action }) => {
    const actionVerb = useActionVerb(action);
    const actionTarget = useActionTarget(action);
    const auxiliaryTool = useActionAuxiliaryTool(action);
    const auxiliaryToolIconSrc = useWeaponIconSrc(
        auxiliaryTool ? auxiliaryTool.name : undefined
    );
    return (
        <div
            className={css`
                position: relative;
            `}
        >
            {!auxiliaryToolIconSrc ? null : (
                <WeaponIcon
                    src={auxiliaryToolIconSrc}
                    alt={auxiliaryTool.name}
                />
            )}
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

const PlayerAction = ({ action }: { action: Action }) => {
    const gameState = useGameState();
    const actionVariant = useActionVariant(action);
    const dispatch = useGameDispatch();
    return (
        <Button
            variant={actionVariant}
            onClick={() => selectPlayerAction(action, gameState, dispatch)}
            block
        >
            <PlayerActionText action={action} />
        </Button>
    );
};

export default PlayerAction;
