import { SkillLevel } from 'a-dirty-trail/build';

const useSkillLevelText = (skillLevel: SkillLevel): string => {
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

export default useSkillLevelText;
