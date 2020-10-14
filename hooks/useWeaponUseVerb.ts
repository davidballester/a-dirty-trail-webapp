import { Weapon } from 'a-dirty-trail/build';

const useWeaponUseVerb = (weapon: Weapon) => {
    if (!!weapon.ammunition) {
        return 'shot';
    }
    return 'charged forward with';
};

export default useWeaponUseVerb;
