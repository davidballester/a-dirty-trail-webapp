import React, { ReactElement } from 'react';
import Health from './Health';
import useSkillLevelText from '../hooks/useSkillLevelText';
import GameSkillSet from 'a-dirty-trail/build/core/SkillSet';
import GameSkill from 'a-dirty-trail/build/core/Skill';
import { usePlayer } from '../contexts/narrativeSceneEngineContext';

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
                <span className="text-capitalize">{player.getName()}</span>
            </dd>

            <dt className="col-sm-3">Health</dt>
            <dd className="col-sm-9">
                <span className="text-capitalize">
                    <Health health={player.getHealth()} />
                </span>
            </dd>

            <dt className="col-sm-3">Skills</dt>
            <dd className="col-sm-9">
                <SkillSet skillSet={player.getSkillSet()} />
            </dd>
        </dl>
    );
};

const SkillSet = ({ skillSet }: { skillSet: GameSkillSet }): ReactElement => (
    <dl>
        {skillSet.getAll().map((skill) => (
            <Skill key={skill.getName()} skill={skill} />
        ))}
    </dl>
);

const Skill = ({ skill }: { skill: GameSkill }): ReactElement => {
    const skillLevel = useSkillLevelText(skill);
    return (
        <>
            <dt>
                <span className="text-capitalize">{skill.getName()}</span>
            </dt>
            <dd>{skillLevel}</dd>
        </>
    );
};

export default NarrationPlayer;
