import React from 'react';
import { css } from 'emotion';
import useActionAuxiliaryTool from '../hooks/useActionAuxiliaryTool';
import useActionTarget from '../hooks/useActionTarget';
import useActionVerb from '../hooks/useActionVerb';
import useRandomColor from '../hooks/useRandomColor';
import { Action } from 'a-dirty-trail';

const ActionListHostileActorAction = ({ action }: { action: Action }) => {
    const actorColor = useRandomColor(action.player.id);
    const actionVerb = useActionVerb(action);
    const actionTarget = useActionTarget(action);
    const auxiliaryTool = useActionAuxiliaryTool(action);
    const auxiliaryToolColor = useRandomColor(
        auxiliaryTool ? auxiliaryTool.id : undefined
    );
    return (
        <div
            className={css`
                margin-bottom: 1rem;
                padding: 0 0.5rem;
                border-left: 2px solid ${actorColor.background};
            `}
        >
            <span
                className={css`
                    text-transform: capitalize;
                    color: ${actorColor.background};
                    font-weight: bold;
                `}
            >
                {action.player.name}
            </span>
            {` will ${actionVerb}`}
            {!actionTarget ? null : (
                <span
                    className={css`
                        font-style: italic;
                    `}
                >
                    {' '}
                    {actionTarget}
                </span>
            )}
            {!auxiliaryTool ? null : (
                <>
                    <span> with </span>
                    <span
                        className={css`
                            color: ${auxiliaryToolColor.background};
                            font-weight: bold;
                        `}
                    >
                        {auxiliaryTool.name}
                    </span>
                </>
            )}
        </div>
    );
};

export default ActionListHostileActorAction;
