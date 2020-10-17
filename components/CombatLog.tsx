import React from 'react';
import { css } from 'emotion';
import {
    SceneActionAndOutcome,
    useSceneActionsAndOutcomes,
} from '../contexts/gameContext';
import {
    Action,
    Actor,
    AttackAction,
    AttackOutcome,
    AttackOutcomeStatus,
    Health as GameHealth,
} from 'a-dirty-trail';
import Health from './Health';

const CombatLog = () => {
    const { action, outcome } = useLastActionAndOutcome();
    if (!action) {
        return null;
    }
    return (
        <section
            className={css`
                text-align: center;
                padding: 2rem;
            `}
        >
            <ActionOutcome action={action} outcome={outcome} />
        </section>
    );
};

export default CombatLog;

const useLastActionAndOutcome = () => {
    const sceneActionsAndOutcomes = useSceneActionsAndOutcomes();
    if (sceneActionsAndOutcomes.length === 0) {
        return {} as SceneActionAndOutcome;
    }
    return sceneActionsAndOutcomes[sceneActionsAndOutcomes.length - 1];
};

const ActionOutcome = ({
    action,
    outcome,
}: {
    action: Action;
    outcome: any;
}) => {
    if (action instanceof AttackAction) {
        return (
            <AttackActionOutcome
                action={action}
                outcome={outcome as AttackOutcome}
            />
        );
    }
    return null;
};

const AttackActionOutcome = ({
    action,
    outcome,
}: {
    action: AttackAction;
    outcome: AttackOutcome;
}) => {
    if (outcome.status === AttackOutcomeStatus.missed) {
        return <MissedAttackActionOutcome />;
    }
    return (
        <>
            <ActionPlayer player={action.player} />
            <span> hit </span>
            <ActionPlayer player={action.oponent} />
            <span> for </span>
            {!!outcome.damage && (
                <div
                    className={css`
                        display: inline-block;
                    `}
                >
                    <Health
                        health={new GameHealth(outcome.damage, outcome.damage)}
                        iconClassName={css`
                            height: 1.5rem;
                        `}
                    />
                </div>
            )}
            {!outcome.damage && <strong>0 hitpoints</strong>}
            {outcome.status === AttackOutcomeStatus.oponentDead && (
                <strong>killing them!</strong>
            )}
        </>
    );
};

const MissedAttackActionOutcome = () => <strong>Missed!</strong>;

const ActionPlayer = ({ player }: { player: Actor }) => (
    <strong className="text-capitalize">{player.name}</strong>
);
