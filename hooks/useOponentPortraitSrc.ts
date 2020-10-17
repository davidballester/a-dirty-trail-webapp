import hashCode from '../helpers/hashCode';

const useOponentPortraitSrc = (seed: string) => {
    const enemyHashCode = hashCode(seed);
    const enemyPortraitIndex = Math.abs(enemyHashCode % 5) + 1;
    return `oponent-portrait-${enemyPortraitIndex}.svg`;
};

export default useOponentPortraitSrc;
