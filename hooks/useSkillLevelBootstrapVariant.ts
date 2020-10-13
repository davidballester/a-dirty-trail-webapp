import { SkillLevel } from 'a-dirty-trail';

const useSkillLevelBootstrapVariant = (skillLevel: SkillLevel) => {
    switch (skillLevel) {
        case SkillLevel.poor: {
            return 'danger';
        }
        case SkillLevel.mediocre: {
            return 'warning';
        }
        case SkillLevel.good: {
            return 'info';
        }
        default: {
            return 'success';
        }
    }
};

export default useSkillLevelBootstrapVariant;
