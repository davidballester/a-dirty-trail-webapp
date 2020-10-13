import React from 'react';
import { SkillName as GameSkillName } from 'a-dirty-trail';

const useSkillName = (skillName: GameSkillName) => {
    switch (skillName) {
        case GameSkillName.closeCombat: {
            return 'Hand to hand combat';
        }
        case GameSkillName.distanceCombat: {
            return 'Ranged combat';
        }
        case GameSkillName.charisma: {
            return 'Charisma';
        }
    }
};

const SkillName = ({ skillName }: { skillName: GameSkillName }) => {
    const displayableSkillName = useSkillName(skillName);
    return <strong>{displayableSkillName}</strong>;
};

export default SkillName;
