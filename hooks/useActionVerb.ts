import {
    Action,
    AdvanceToActAction,
    AdvanceToSceneAction,
    AttackAction,
    LootAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';

const useActionVerb = (action: Action): string => {
    if (action instanceof AttackAction) {
        return 'attack';
    }
    if (action instanceof ReloadAction) {
        return 'reload';
    }
    if (
        action instanceof AdvanceToSceneAction ||
        action instanceof AdvanceToActAction
    ) {
        return 'advance';
    }
    if (action instanceof ScapeAction) {
        return 'scape';
    }
    if (action instanceof LootAction) {
        return 'loot';
    }
};

export default useActionVerb;
