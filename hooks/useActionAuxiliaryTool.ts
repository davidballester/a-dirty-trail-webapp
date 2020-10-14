import { Action, AttackAction, ReloadAction } from 'a-dirty-trail';

const useActionAuxiliaryTool = (action: Action) => {
    if (action instanceof AttackAction || action instanceof ReloadAction) {
        return action.weapon;
    }
    return null;
};

export default useActionAuxiliaryTool;
