const capitalize = (string: string): string => {
    if (!string) {
        return string;
    }
    const firstLetter = string[0];
    const stringWithoutFirstLetter = string.slice(1);
    return `${firstLetter.toUpperCase()}${stringWithoutFirstLetter}`;
};

export default capitalize;
