import React from 'react';
import { SkillName as GameSkillName } from 'a-dirty-trail';
import useSkillName from '../hooks/useSkillName';

const SkillName = ({ skillName }: { skillName: GameSkillName }) => {
    const displayableSkillName = useSkillName(skillName);
    return <strong>{displayableSkillName}</strong>;
};

export default SkillName;
