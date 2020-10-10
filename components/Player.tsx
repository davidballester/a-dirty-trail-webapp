import React, { Fragment } from 'react';
import { css } from 'emotion';
import {
    Actor,
    SkillLevel,
    SkillName,
    Inventory as GameInventory,
} from 'a-dirty-trail';
import { useGame } from '../contexts/gameContext';
import Inventory from './Inventory';
import Health from './Health';

const getSkillName = (skillName: SkillName) => {
    switch (skillName) {
        case SkillName.closeCombat: {
            return 'Hand to hand combat';
        }
        case SkillName.distanceCombat: {
            return 'Ranged combat';
        }
        case SkillName.pacify: {
            return 'Pacify';
        }
    }
};

const getSkillLevel = (skillLevel: SkillLevel) => {
    switch (skillLevel) {
        case SkillLevel.poor: {
            return 'poor';
        }
        case SkillLevel.mediocre: {
            return 'mediocre';
        }
        case SkillLevel.good: {
            return 'good';
        }
        case SkillLevel.master: {
            return 'master';
        }
    }
};

const Skills = ({ player }: { player: Actor }) => (
    <section>
        <h3>Skills</h3>
        <dl
            className={css`
                text-transform: capitalize;
            `}
        >
            {player.skills.map((skill) => (
                <Fragment key={skill.name}>
                    <dt>{getSkillName(skill.name)}</dt>
                    <dd>{getSkillLevel(skill.level)}</dd>
                </Fragment>
            ))}
        </dl>
    </section>
);

const PlayerInventory = ({ inventory }: { inventory: GameInventory }) => (
    <section>
        <h3>Inventory</h3>
        <Inventory inventory={inventory} />
    </section>
);

const Player = () => {
    const game = useGame();
    if (!game) {
        return null;
    }
    const player = game.player;
    return (
        <article>
            <h2>{player.name}</h2>
            <Health health={player.health} />
            <Skills player={player} />
            <PlayerInventory inventory={player.inventory} />
        </article>
    );
};

export default Player;
