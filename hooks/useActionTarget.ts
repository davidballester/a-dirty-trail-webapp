import {
    Action,
    AdvanceToSceneAction,
    AttackAction,
    LootAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';

const useActionTarget = (action: Action) => {
    if (action instanceof AttackAction) {
        return action.oponent;
    }
    if (action instanceof ReloadAction) {
        return action.weapon;
    }
    if (
        action instanceof AdvanceToSceneAction ||
        action instanceof AdvanceToSceneAction ||
        action instanceof ScapeAction
    ) {
        return null;
    }
    if (action instanceof LootAction) {
        return action.inventory;
    }
};

export default useActionTarget;
