import {
    Action,
    AdvanceToActAction,
    AdvanceToSceneAction,
    AttackAction,
    PacifyAction,
    ReloadAction,
    ScapeAction,
} from 'a-dirty-trail';

const useActionVerb = (action: Action) => {
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
    if (action instanceof PacifyAction) {
        return 'pacify';
    }
    if (action instanceof ScapeAction) {
        return 'scape';
    }
};

export default useActionVerb;
