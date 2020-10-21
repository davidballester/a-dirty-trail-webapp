import {
    Action,
    Actor,
    AdvanceToSceneAction,
    AttackAction,
    Inventory,
    LootAction,
    ReloadAction,
    ScapeAction,
    Weapon,
} from 'a-dirty-trail';

const useActionTarget = (action: Action): Actor | Weapon | Inventory => {
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
