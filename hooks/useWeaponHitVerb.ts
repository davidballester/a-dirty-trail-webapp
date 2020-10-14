import { Weapon } from 'a-dirty-trail/build';

const useWeaponHitVerb = (weapon: Weapon) => {
    switch (weapon.name) {
        case 'knife': {
            return 'slashing';
        }
        case 'club': {
            return 'clubbing';
        }
        default: {
            return 'hitting';
        }
    }
};

export default useWeaponHitVerb;
