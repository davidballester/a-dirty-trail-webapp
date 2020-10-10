import React from 'react';
import { useGame } from '../contexts/gameContext';
import { Actor as GameActor, ActorStatus } from 'a-dirty-trail';
import {
    UnstyledList,
    UnstyledListItem,
    UnstyledListHorizontal,
    UnstyledListItemHorizontal,
} from './UnstyledList';
import Badge from 'react-bootstrap/Badge';
import Inventory from './Inventory';
import Health from './Health';

const Actor = ({ actor }: { actor: GameActor }) => (
    <article>
        <h4>{actor.name}</h4>
        <Health health={actor.health} />
        <UnstyledListHorizontal>
            {actor.is(ActorStatus.wild) && (
                <UnstyledListItemHorizontal>
                    <Badge variant="danger">wild</Badge>
                </UnstyledListItemHorizontal>
            )}
            {actor.is(ActorStatus.hostile) && (
                <UnstyledListItemHorizontal>
                    <Badge variant="warning">hostile</Badge>
                </UnstyledListItemHorizontal>
            )}
            {!actor.is(ActorStatus.hostile) && (
                <UnstyledListItemHorizontal>
                    <Badge variant="info">peaceful</Badge>
                </UnstyledListItemHorizontal>
            )}
        </UnstyledListHorizontal>
        <Inventory inventory={actor.inventory} />
    </article>
);

const Actors = ({ actors }: { actors: GameActor[] }) => (
    <section>
        <h3>Actors</h3>
        <UnstyledList>
            {actors
                .filter((actor) => actor.is(ActorStatus.hostile))
                .map((actor) => (
                    <UnstyledListItem key={actor.id}>
                        <Actor actor={actor} />
                    </UnstyledListItem>
                ))}
            {actors
                .filter((actor) => !actor.is(ActorStatus.hostile))
                .map((actor) => (
                    <UnstyledListItem key={actor.id}>
                        <Actor actor={actor} />
                    </UnstyledListItem>
                ))}
        </UnstyledList>
    </section>
);

const Scene = () => {
    const game = useGame();
    if (!game) {
        return null;
    }
    const scene = game.scene;
    return (
        <section>
            <h2>{scene.name}</h2>
            {scene.actors.length ? <Actors actors={scene.actors} /> : null}
        </section>
    );
};

export default Scene;
