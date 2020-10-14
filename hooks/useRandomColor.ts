interface Color {
    background: string;
    textOverBackground: string;
}

const colors: Color[] = [
    {
        background: '#aa8f00',
        textOverBackground: '#000000',
    },
    {
        background: '#F2D750',
        textOverBackground: '#000000',
    },
    {
        background: '#735620',
        textOverBackground: '#ffffff',
    },
    {
        background: '#A8203B',
        textOverBackground: '#ffffff',
    },
    {
        background: '#5C1120',
        textOverBackground: '#ffffff',
    },
    {
        background: '#6AD3D9',
        textOverBackground: '#000000',
    },
    {
        background: '#3889F2',
        textOverBackground: '#000000',
    },
    {
        background: '#3D7300',
        textOverBackground: '#ffffff',
    },
    {
        background: '#5DA60F',
        textOverBackground: '#000000',
    },
    {
        background: '#95519E',
        textOverBackground: '#ffffff',
    },
];

const useRandomColor = (seed: string) => {
    if (!seed) {
        return null;
    }
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
