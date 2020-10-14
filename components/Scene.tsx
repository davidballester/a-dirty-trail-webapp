import React from 'react';
import {
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
}: {
    actions: GameAction[];
    player: Actor;
}) => (
    <SideArticle even={true}>
        <header>
            <h3>Actions</h3>
        </header>
        <ul className="list-unstyled">
            {actions.map((action, index) => (
                <React.Fragment key={action.id}>
                    <li>
                        <ActionListPlayerAction
                            player={player}
                            active={index === 0}
                        />
                    </li>
                    <li>
                        <ActionListHostileActorAction action={action} />
                    </li>
                </React.Fragment>
            ))}
        </ul>
    </SideArticle>
);

const Scene = () => {
    const scene = useScene();
    const player = usePlayer();
    const oponentsActions = useOponentsActions();
    if (!scene) {
        return null;
    }
    const hostileActors = scene.getHostileActors();
    if (!hostileActors.length) {
        return <EmptyState />;
    }
    return (
        <article>
            <HostileActors hostileActors={hostileActors} />
            {!oponentsActions.length ? null : (
                <Actions actions={oponentsActions} player={player} />
            )}
        </article>
    );
};

export default Scene;
