import React from 'react';
import { css } from 'emotion';
import {
    useLastActionAndOutcome,
    useOponentsActions,
    usePlayer,
    useScene,
} from '../contexts/gameContext';
import { NonPlayableActor, Action as GameAction, Actor } from 'a-dirty-trail';
import EmptyState from './EmptyState';
import SideArticle from './SideArticle';
import HostileActor from './HostileActor';
import ActionListHostileActorAction from './ActionListHostileActorAction';
import ActionListPlayerAction from './ActionListPlayerAction';

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
                    <HostileActor hostileActor={hostileActor} />
                </li>
            ))}
        </ul>
    </SideArticle>
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
            {!startsWithPlayer ? null : (
                <ActionListPlayerAction player={player} active={true} />
            )}
            {actions.map((action) => (
                <React.Fragment key={action.id}>
                    <li>
                        <ActionListHostileActorAction action={action} />
                    </li>
                    <li>
                        <ActionListPlayerAction player={player} />
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
