import React from 'react';
import {
    Action,
    AttackAction,
    AttackOutcome,
    AttackOutcomeStatus,
    Item,
    LootAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';
import useWeaponHitVerb from '../hooks/useWeaponHitVerb';
import useWeaponUseVerb from '../hooks/useWeaponUseVerb';
import ListOfNames from './ListOfNames';

const AttackActionNarration = ({
    action,
    outcome,
}: {
    action: AttackAction;
    outcome: AttackOutcome;
}) => {
    const { player, weapon, oponent } = action;
    const weaponUseVerb = useWeaponUseVerb(weapon);
    const weaponHitVerb = useWeaponHitVerb(weapon);
    const isMissed = outcome.status === AttackOutcomeStatus.missed;
    const isOponentDead = outcome.status === AttackOutcomeStatus.oponentDead;
    return (
        <p>
            <span className="text-capitalize">{player.name}</span>
            <span> {weaponUseVerb} their </span>
            <strong>{weapon.name}</strong>
            {isMissed && <span> and missed </span>}
            {!isMissed && <span>, {weaponHitVerb} </span>}
            <strong>{oponent.name}</strong>
            {!isMissed && (
                <>
                    <span> for </span>
                    <strong className="text-danger">{outcome.damage}</strong>
                    <span>
                        {' '}
                        {outcome.damage === 1 ? 'hitpoint' : 'hitpoints'}
                    </span>
                </>
            )}
            {isOponentDead && (
                <>
                    <span>, who fell </span>
                    <strong className="text-danger">dead</strong>
                </>
            )}
            <span>.</span>
        </p>
    );
};

const LootActionNarration = ({
    action,
    itemsFound,
}: {
    action: LootAction;
    itemsFound: Item[];
}) => (
    <p>
        <span className="text-capitalize">{action.player.name}</span>
        <span> searched the </span>
        <strong>{action.inventory.name}</strong>
        {itemsFound.length && (
            <>
                <span> and found </span>
                <ListOfNames names={itemsFound.map((item) => item.name)} />
            </>
        )}
        {!itemsFound.length && <span>but didn't find anything useful</span>}
        <span>.</span>
    </p>
);

const EscapeActionNarration = ({ action }: { action: ScapeAction }) => (
    <p>
        <span className="text-capitalize">{action.player.name}</span>
        <strong> escaped!</strong>
    </p>
);

const ReloadActionNarration = ({ action }: { action: ReloadAction }) => (
    <p>
        <span className="text-capitalize">{action.player.name}</span>
        <strong> reloaded</strong>
        <span> their</span>
        <strong> {action.weapon.name}</strong>
        <span>.</span>
    </p>
);

const ActionNarration = ({
    action,
    outcome,
}: {
    action: Action;
    outcome: any;
}) => {
    if (action instanceof AttackAction) {
        return (
            <AttackActionNarration
                action={action}
                outcome={outcome as AttackOutcome}
            />
        );
    }
    if (action instanceof LootAction) {
        return (
            <LootActionNarration
                action={action}
                itemsFound={outcome as Item[]}
            />
        );
    }
    if (action instanceof ScapeAction) {
        return <EscapeActionNarration action={action} />;
    }
    if (action instanceof ReloadAction) {
        return <ReloadActionNarration action={action} />;
    }
    return (
        <span>
            {action.getName()} - {JSON.stringify(outcome)}
        </span>
    );
};

export default ActionNarration;
