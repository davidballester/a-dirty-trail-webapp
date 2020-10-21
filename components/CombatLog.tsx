import React, { Fragment, ReactElement } from 'react';
import { css } from 'emotion';
import { useLastActionAndOutcome } from '../contexts/gameContext';
import {
    Action,
    Actor,
    Ammunition,
    AttackAction,
    AttackOutcome,
    AttackOutcomeStatus,
    Health as GameHealth,
    Item,
    LootAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';
import Health from './Health';

const CombatLog = (): ReactElement => {
    const { action, outcome } = useLastActionAndOutcome();
    if (!action) {
        return null;
    }
    return (
        <section
            className={css`
                text-align: center;
                position: relative;
                > div {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            `}
        >
            <div
                className={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                    will-change: opacity;
                `}
            >
                <div>
                    <ActionOutcome action={action} outcome={outcome} />
                </div>
            </div>
        </section>
    );
};

export default CombatLog;

const ActionOutcome = ({
    action,
    outcome,
}: {
    action: Action;
    outcome: any;
}): ReactElement => {
    if (action instanceof AttackAction) {
        return (
            <AttackActionOutcome
                action={action}
                outcome={outcome as AttackOutcome}
            />
        );
    }
    if (action instanceof ReloadAction) {
        return <ReloadActionOutcome action={action} />;
    }
    if (action instanceof ScapeAction) {
        return <ScapeActionOutcome action={action} />;
    }
    if (action instanceof LootAction) {
        return <LootActionOutcome action={action} outcome={outcome} />;
    }
    return null;
};

const AttackActionOutcome = ({
    action,
    outcome,
}: {
    action: AttackAction;
    outcome: AttackOutcome;
}): ReactElement => {
    if (outcome.status === AttackOutcomeStatus.missed) {
        return <MissedAttackActionOutcome action={action} />;
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
                        health={new GameHealth(0, outcome.damage)}
                        iconClassName={css`
                            height: 1.5rem;
                        `}
                    />
                </div>
            )}
            {!outcome.damage && <strong>0 hitpoints</strong>}
            {outcome.status === AttackOutcomeStatus.oponentDead && (
                <strong>, killing them!</strong>
            )}
        </>
    );
};

const MissedAttackActionOutcome = ({
    action,
}: {
    action: AttackAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.player} />
        <span> missed </span>
        <ActionPlayer player={action.oponent} />
    </>
);

const ActionPlayer = ({ player }: { player: Actor }): ReactElement => (
    <strong className="text-capitalize">{player.name}</strong>
);

const ReloadActionOutcome = ({
    action,
}: {
    action: ReloadAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.player} />
        <span> reloaded their </span>
        <strong>{action.weapon.name}</strong>
    </>
);

const ScapeActionOutcome = ({
    action,
}: {
    action: ScapeAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.player} />
        <span> scaped!</span>
    </>
);

const LootActionOutcome = ({
    action,
    outcome: items,
}: {
    action: LootAction;
    outcome: Item[];
}): ReactElement => (
    <>
        <ActionPlayer player={action.player} />
        <span> found </span>
        {!items.length && <span>nothing of interest</span>}
        {!!items.length && <ItemsEnumeration items={items} />}
    </>
);

const ItemsEnumeration = ({ items }: { items: Item[] }): ReactElement => (
    <>
        {items.length === 1 && <ItemName item={items[0]} />}
        {items.length > 1 && (
            <>
                {items.slice(0, -1).map((item, index) => (
                    <Fragment key={item.id}>
                        <ItemName item={item} />
                        {index < items.length - 2 && <span>, </span>}
                    </Fragment>
                ))}
                <span> and </span>
                <ItemName item={items[items.length - 1]} />
            </>
        )}
    </>
);

const ItemName = ({ item }: { item: Item }): ReactElement => {
    if (item instanceof Ammunition) {
        return (
            <strong>
                {item.quantity} {item.name}
            </strong>
        );
    }
    return <strong>{item.name}</strong>;
};
