import {
    Action,
    AdvanceToSceneAction,
    AttackAction,
    PacifyAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';

const useActionTarget = (action: Action) => {
    if (action instanceof AttackAction) {
        return action.oponent.name;
    }
    if (action instanceof ReloadAction) {
        return action.weapon.name;
    }
    if (
        action instanceof AdvanceToSceneAction ||
        action instanceof AdvanceToSceneAction ||
        action instanceof ScapeAction
    ) {
        return null;
    }
    if (action instanceof PacifyAction) {
        return action.oponent;
    }
};

export default useActionTarget;
