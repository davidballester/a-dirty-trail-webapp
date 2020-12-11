import React, { Fragment, ReactElement } from 'react';
import { css } from 'emotion';
import Health from './Health';
import { useLastActionAndOutcome } from '../contexts/combatSceneEngineContext';
import Action from 'a-dirty-trail/build/actions/Action';
import AttackAction from 'a-dirty-trail/build/actions/AttackAction';
import { AttackOutcome } from 'a-dirty-trail/build/core/Weapon';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';
import ScapeAction from 'a-dirty-trail/build/actions/ScapeAction';
import LootAction from 'a-dirty-trail/build/actions/LootAction';
import GameHealth from 'a-dirty-trail/build/core/Health';
import Actor from 'a-dirty-trail/build/core/Actor';
import Inventory from 'a-dirty-trail/build/core/Inventory';

const CombatLog = (): ReactElement => {
    const [action, outcome] = useLastActionAndOutcome();
    return <ActionOutcome action={action} outcome={outcome} />;
};

export default CombatLog;

const ActionOutcome = ({
    action,
    outcome,
}: {
    action: Action<any>;
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
    if (outcome.type === 'missed') {
        return <MissedAttackActionOutcome action={action} />;
    }
    return (
        <>
            <ActionPlayer player={action.getActor()} />
            <span> hit </span>
            <ActionPlayer player={action.getOponent()} />
            <span> for </span>
            {!!outcome.damage && (
                <div
                    className={css`
                        display: inline-block;
                    `}
                >
                    <Health
                        health={
                            new GameHealth({ current: 0, max: outcome.damage })
                        }
                        iconClassName={css`
                            height: 1.5rem;
                        `}
                    />
                </div>
            )}
            {!outcome.damage && <strong>0 hitpoints</strong>}
            {!action.getOponent().isAlive() && <strong>, killing them!</strong>}
        </>
    );
};

const MissedAttackActionOutcome = ({
    action,
}: {
    action: AttackAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.getActor()} />
        <span> missed </span>
        <ActionPlayer player={action.getOponent()} />
    </>
);

const ActionPlayer = ({ player }: { player: Actor }): ReactElement => (
    <strong className="text-capitalize">{player.getName()}</strong>
);

const ReloadActionOutcome = ({
    action,
}: {
    action: ReloadAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.getActor()} />
        <span> reloaded their </span>
        <strong>{action.getWeapon().getName()}</strong>
    </>
);

const ScapeActionOutcome = ({
    action,
}: {
    action: ScapeAction;
}): ReactElement => (
    <>
        <ActionPlayer player={action.getActor()} />
        <span> scaped!</span>
    </>
);

const LootActionOutcome = ({
    action,
    outcome: inventory,
}: {
    action: LootAction;
    outcome: Inventory;
}): ReactElement => (
    <>
        <ActionPlayer player={action.getActor()} />
        <span> found </span>
        <InventoryEnumeration inventory={inventory} />
    </>
);

const InventoryEnumeration = ({
    inventory,
}: {
    inventory: Inventory;
}): ReactElement => {
    const weaponNames = inventory
        .getWeapons()
        .map((weapon) => weapon.getName());
    const ammunitionsByType = inventory.getAmmunitionsByType();
    const ammunitions = Object.keys(ammunitionsByType).map(
        (ammunitionType) =>
            `${ammunitionsByType[ammunitionType]} ${ammunitionType}`
    );
    const trinkets = inventory
        .getTrinkets()
        .map((trinket) => trinket.getName());
    const allItems = [...weaponNames, ...ammunitions, ...trinkets];
    return (
        <>
            {allItems.length === 1 && <ItemName item={allItems[0]} />}
            {allItems.length > 1 && (
                <>
                    {allItems.slice(0, -1).map((item, index) => (
                        <Fragment key={index}>
                            <ItemName item={item} />
                            {index < allItems.length - 2 && <span>, </span>}
                        </Fragment>
                    ))}
                    <span> and </span>
                    <ItemName item={allItems[allItems.length - 1]} />
                </>
            )}
        </>
    );
};

const ItemName = ({ item }: { item: string }): ReactElement => (
    <strong>{item}</strong>
);
