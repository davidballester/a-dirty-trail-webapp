const useWeaponIconSrc = (weaponName: string) => {
    const knownWeaponNames = [
        'revolver',
        'rifle',
        'shotgun',
        'knife',
        'derringer',
        'club',
    ];
    if (knownWeaponNames.indexOf(weaponName) >= 0) {
        return `${weaponName}.svg`;
    }
    return 'revolver.svg';
};

export default useWeaponIconSrc;
