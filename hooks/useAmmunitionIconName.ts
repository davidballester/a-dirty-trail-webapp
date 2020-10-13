const useAmmunitionIconName = (ammunitionName: string) => {
    if (!ammunitionName) {
        return null;
    }
    const knownAmmunitionNames = ['bullet', 'shell'];
    if (knownAmmunitionNames.indexOf(ammunitionName) >= 0) {
        return ammunitionName;
    }
    return 'bullet';
};

export default useAmmunitionIconName;
