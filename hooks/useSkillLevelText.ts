import Skill from 'a-dirty-trail/build/core/Skill';

const useSkillLevelText = (skill: Skill): string => {
    const probabilityOfSuccess = skill.getProbabilityOfSuccess();
    if (probabilityOfSuccess < 0.25) {
        return 'poor';
    }
    if (probabilityOfSuccess < 0.5) {
        return 'mediocre';
    }
    if (probabilityOfSuccess < 0.75) {
        return 'good';
    }
    return 'master';
};

export default useSkillLevelText;
