import { SkillName } from 'a-dirty-trail';

const useSkillName = (skillName: SkillName) => {
    switch (skillName) {
        case SkillName.closeCombat: {
            return 'Hand to hand combat';
        }
        case SkillName.distanceCombat: {
            return 'Ranged combat';
        }
        case SkillName.charisma: {
            return 'Charisma';
        }
    }
};

export default useSkillName;
