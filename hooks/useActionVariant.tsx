import {
    Action,
    AdvanceToSceneAction,
    AttackAction,
    LootAction,
    ReloadAction,
} from 'a-dirty-trail';

const useActionVariant = (action: Action) => {
    if (action instanceof AttackAction) {
        return 'danger';
    }
    if (action instanceof ReloadAction) {
        return 'warning';
    }
    if (
        action instanceof AdvanceToSceneAction ||
        action instanceof AdvanceToSceneAction
    ) {
        return 'success';
    }
    if (action instanceof LootAction) {
        return 'secondary';
    }
    return 'info';
};

export default useActionVariant;
