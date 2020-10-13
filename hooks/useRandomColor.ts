import { useMemo } from 'react';

const colors = [
    '#95B8DB',
    '#C07E32',
    '#A45523',
    '#0971AD',
    '#D8A336',
    '#38b2ac',
    '#D8A336',
    '#5a67d8',
];

const useRandomColor = (seed: string) => {
    const seedHashCode = hashCode(seed);
    console.log(seed, seedHashCode, Math.abs(seedHashCode % colors.length));
    const colorIndex = Math.abs(seedHashCode % colors.length);
    return colors[colorIndex];
};

const hashCode = (string: string) => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var character = string.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash;
    }
    return hash;
};

export default useRandomColor;
