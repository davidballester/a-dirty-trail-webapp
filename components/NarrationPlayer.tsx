import React, { ReactElement } from 'react';
import { usePlayer } from '../contexts/gameContext';
import Health from './Health';
import { Skill as GameSkill } from 'a-dirty-trail';
import useSkillName from '../hooks/useSkillName';
import useSkillLevelText from '../hooks/useSkillLevelText';

const NarrationPlayer = (): ReactElement => (
    <article>
        <Header />
        <Player />
    </article>
);

const Header = (): ReactElement => (
    <header>
        <h2 className="text-capitalize">Character</h2>
    </header>
);

const Player = (): ReactElement => {
    const player = usePlayer();
    return (
        <dl className="row">
            <dt className="col-sm-3">Name</dt>
            <dd className="col-sm-9">
                <span className="text-capitalize">{player.name}</span>
            </dd>

            <dt className="col-sm-3">Health</dt>
            <dd className="col-sm-9">
                <span className="text-capitalize">
                    <Health health={player.health} />
                </span>
            </dd>

            <dt className="col-sm-3">Skills</dt>
            <dd className="col-sm-9">
                <PlayerSkills skills={player.skills} />
            </dd>
        </dl>
    );
};

const PlayerSkills = ({ skills }: { skills: GameSkill[] }): ReactElement => (
    <dl>
        {skills.map((skill) => (
            <PlayerSkill key={skill.name} skill={skill} />
        ))}
    </dl>
);

const PlayerSkill = ({ skill }: { skill: GameSkill }): ReactElement => {
    const skillName = useSkillName(skill.name);
    const skillLevel = useSkillLevelText(skill.level);
    return (
        <>
            <dt>{skillName}</dt>
            <dd>{skillLevel}</dd>
        </>
    );
};

export default NarrationPlayer;
