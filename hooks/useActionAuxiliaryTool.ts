import { Action, AttackAction } from 'a-dirty-trail';

const useActionAuxiliaryTool = (action: Action) => {
    if (action instanceof AttackAction) {
        return action.weapon;
    }
    return null;
};

export default useActionAuxiliaryTool;
