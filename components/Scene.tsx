import React from 'react';
import { css } from 'emotion';
import {
    useLastActionAndOutcome,
    useOponentsActions,
    usePlayer,
    useScene,
} from '../contexts/gameContext';
import { NonPlayableActor, Action as GameAction, Actor } from 'a-dirty-trail';
import Health from './Health';
import EmptyState from './EmptyState';
import SideArticle from './SideArticle';
import Weapon from './Weapon';
import useActionVerb from '../hooks/useActionVerb';
import useActionTarget from '../hooks/useActionTarget';
import StripedBackground from './StripedBackground';

const HostileActor = ({
    hostileActor,
    even,
}: {
    hostileActor: NonPlayableActor;
    even: boolean;
}) => (
    <article
        className={css`
            padding: 0.5rem;
            ${even ? 'background-color: #F6F4E1;' : ''}
        `}
    >
        <header className="text-capitalize">
            <h3>{hostileActor.name}</h3>
            <Health health={hostileActor.health} />
        </header>
        <ul className="list-unstyled">
            {hostileActor.inventory.getWeapons().map((weapon) => (
                <li key={weapon.id}>
                    <Weapon
                        weapon={weapon}
                        skillLevel={
                            hostileActor.getSkill(weapon.skillName).level
                        }
                    />
                </li>
            ))}
        </ul>
    </article>
);

const HostileActors = ({
    hostileActors,
}: {
    hostileActors: NonPlayableActor[];
}) => (
    <SideArticle even={false}>
        <header>
            <h3>Enemies</h3>
        </header>
        <ul className="list-unstyled">
            {hostileActors.map((hostileActor, index) => (
                <li key={hostileActor.id}>
                    <HostileActor
                        hostileActor={hostileActor}
                        even={index % 2 === 0}
                    />
                </li>
            ))}
        </ul>
    </SideArticle>
);

const Action = ({ action }: { action: GameAction }) => {
    const actionVerb = useActionVerb(action);
    const actionTarget = useActionTarget(action);
    return (
        <div
            className={css`
                position: relative;
                font-weight: bold;
                margin-bottom: 1rem;
            `}
        >
            <StripedBackground />
            <span className="text-capitalize">{action.player.name}</span>
            {` will ${actionVerb}`}
            {!actionTarget ? null : (
                <span className="text-capitalize"> {actionTarget}</span>
            )}
        </div>
    );
};

const UserAction = ({ player }: { player: Actor }) => (
    <p
        className={css`
            font-style: italic;
        `}
    >
        {`${player.name} action`.toUpperCase()}
    </p>
);

const Actions = ({
    actions,
    player,
    startsWithPlayer,
}: {
    actions: GameAction[];
    player: Actor;
    startsWithPlayer: boolean;
}) => (
    <SideArticle even={true}>
        <header>
            <h3>Actions</h3>
        </header>
        <ul className="list-unstyled">
            {!startsWithPlayer ? null : <UserAction player={player} />}
            {actions.map((action) => (
                <React.Fragment key={action.id}>
                    <li>
                        <Action action={action} />
                    </li>
                    <li>
                        <UserAction player={player} />
                    </li>
                </React.Fragment>
            ))}
        </ul>
    </SideArticle>
);

const Scene = () => {
    const scene = useScene();
    const player = usePlayer();
    const [lastAction] = useLastActionAndOutcome();
    const oponentsActions = useOponentsActions();
    if (!scene) {
        return null;
    }
    const hostileActors = scene.getHostileActors();
    const containers = scene.containers;
    if (!hostileActors.length && !containers.length) {
        return <EmptyState />;
    }
    return (
        <article>
            <HostileActors hostileActors={hostileActors} />
            <Actions
                actions={oponentsActions}
                player={player}
                startsWithPlayer={
                    !lastAction || lastAction.player.id !== player.id
                }
            />
        </article>
    );
};

export default Scene;
