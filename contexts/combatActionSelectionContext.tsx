import Action from 'a-dirty-trail/build/actions/Action';
import AttackAction from 'a-dirty-trail/build/actions/AttackAction';
import LootAction from 'a-dirty-trail/build/actions/LootAction';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';
import ActionsMap from 'a-dirty-trail/build/core/ActionsMap';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import ThingWithId from 'a-dirty-trail/build/core/ThingWithId';
import Weapon from 'a-dirty-trail/build/core/Weapon';
import { createContext, ReactElement, useContext, useReducer } from 'react';
import { usePlayerActions } from './combatSceneEngineContext';

export type ActionType = 'attack' | 'reload' | 'loot';
export interface CombatActionSelectionState {
    actionType?: ActionType;
    oponent?: NonPlayableActor;
    weapon?: Weapon;
}

interface SelectActionTypeAction {
    type: 'selectActionType';
    payload: ActionType;
}

interface SelectOponent {
    type: 'selectOponent';
    payload: NonPlayableActor;
}

interface SelectDeadOponent {
    type: 'selectDeadOponent';
    payload: NonPlayableActor;
}

interface SelectWeapon {
    type: 'selectWeapon';
    payload: Weapon;
}

interface ClearSelection {
    type: 'clearSelection';
}

type CombatActionSelectionAction =
    | SelectActionTypeAction
    | SelectOponent
    | SelectDeadOponent
    | SelectWeapon
    | ClearSelection;

type CombatActionSelectionDispatch = (
    action: CombatActionSelectionAction
) => void;

const CombatActionSelectionContext = createContext(
    undefined as CombatActionSelectionState
);
const CombatActionSelectionDispatchContext = createContext(
    undefined as CombatActionSelectionDispatch
);

const combatActionSelectionReducer = (
    state: CombatActionSelectionState,
    action: CombatActionSelectionAction
): CombatActionSelectionState => {
    switch (action.type) {
        case 'selectActionType': {
            return {
                ...state,
                actionType: action.payload,
            };
        }
        case 'selectOponent': {
            return {
                ...state,
                oponent: action.payload,
            };
        }
        case 'selectDeadOponent': {
            return {
                ...state,
                oponent: action.payload,
            };
        }
        case 'selectWeapon': {
            return {
                ...state,
                weapon: action.payload,
            };
        }
        case 'clearSelection': {
            return {};
        }
    }
};

export const CombatActionSelectionProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const [state, dispatch] = useReducer(combatActionSelectionReducer, {});
    return (
        <CombatActionSelectionContext.Provider value={state}>
            <CombatActionSelectionDispatchContext.Provider value={dispatch}>
                {children}
            </CombatActionSelectionDispatchContext.Provider>
        </CombatActionSelectionContext.Provider>
    );
};

const useState = () => {
    const combatActionSelection = useContext(
        CombatActionSelectionContext
    ) as CombatActionSelectionState;
    if (combatActionSelection === undefined) {
        throw new Error(
            'useState must be used within a CombatActionSelectionProvider'
        );
    }
    return combatActionSelection;
};

export const useActionType = (): ActionType => {
    const state = useState();
    return state.actionType;
};

export const useOponent = (): NonPlayableActor => {
    const state = useState();
    return state.oponent;
};

export const useWeapon = (): Weapon => {
    const state = useState();
    return state.weapon;
};

export const useIsSelectionComplete = (): boolean => {
    const state = useState();
    if (!state.actionType) {
        return false;
    }
    switch (state.actionType) {
        case 'attack': {
            return !!state.oponent && !!state.weapon;
        }
        case 'loot': {
            return !!state.oponent;
        }
        case 'reload': {
            return !!state.weapon;
        }
    }
};

export const useSelectedPlayerAction = (): Action<any> => {
    const state = useState();
    const isSelectionComplete = useIsSelectionComplete();
    const playerActions = usePlayerActions();
    if (!isSelectionComplete) {
        return undefined;
    }
    const playerAction = findPlayerActionSelected(playerActions, state);
    return playerAction;
};

const findPlayerActionSelected = (
    playerActions: ActionsMap,
    state: CombatActionSelectionState
) => {
    switch (state.actionType) {
        case 'attack': {
            return findPlayerAttackActionSelected(playerActions, state);
        }
        case 'reload': {
            return findPlayerReloadActionSelected(playerActions, state);
        }
        case 'loot': {
            return findLootActionSelected(playerActions, state);
        }
    }
};

const findPlayerAttackActionSelected = (
    playerActions: ActionsMap,
    state: CombatActionSelectionState
) =>
    playerActions
        .getAttackActions()
        .filter((action) => action.getOponent().equals(state.oponent))
        .find((action) => action.getWeapon().equals(state.weapon));

const findPlayerReloadActionSelected = (
    playerActions: ActionsMap,
    state: CombatActionSelectionState
) =>
    playerActions
        .getReloadActions()
        .find((action) => action.getWeapon().equals(state.weapon));

const findLootActionSelected = (
    playerActions: ActionsMap,
    state: CombatActionSelectionState
) =>
    playerActions
        .getLootActions()
        .find((action) => action.getOponent().equals(state.oponent));

const useDispatch = () => {
    const dispatch = useContext(
        CombatActionSelectionDispatchContext
    ) as CombatActionSelectionDispatch;
    if (dispatch === undefined) {
        throw new Error(
            'useDispatch must be used within a CombatActionSelectionProvider'
        );
    }
    return dispatch;
};

export const useClearSelection = (): (() => void) => {
    const dispatch = useDispatch();
    return () =>
        dispatch({
            type: 'clearSelection',
        });
};

export const useSelectActionType = (): ((actionType: ActionType) => void) => {
    const dispatch = useDispatch();
    return (actionType: ActionType) =>
        dispatch({
            type: 'selectActionType',
            payload: actionType,
        });
};

export const useSelectOponent = (): ((oponent: NonPlayableActor) => void) => {
    const dispatch = useDispatch();
    return (oponent: NonPlayableActor) =>
        dispatch({
            type: 'selectOponent',
            payload: oponent,
        });
};

export const useSelectWeapon = (): ((weapon: Weapon) => void) => {
    const dispatch = useDispatch();
    return (weapon: Weapon) =>
        dispatch({
            type: 'selectWeapon',
            payload: weapon,
        });
};

export const useAvailableActionTypes = (): ActionType[] => {
    const playerActions = usePlayerActions();
    const actionTypes = [];
    if (playerActions.getAttackActions().length) {
        actionTypes.push('attack');
    }
    if (playerActions.getReloadActions().length) {
        actionTypes.push('reload');
    }
    if (playerActions.getLootActions().length) {
        actionTypes.push('loot');
    }
    return actionTypes;
};

export const useAvailableOponents = (): NonPlayableActor[] => {
    const playerActions = usePlayerActions();
    const attackActions = playerActions.getAttackActions();
    const oponents = getOponents(attackActions);
    const uniqueOponents = getUniqueObjectsWithId(oponents);
    return uniqueOponents;
};

const getOponents = (actions: AttackAction[]): NonPlayableActor[] =>
    actions.map((action) => action.getOponent() as NonPlayableActor);

const getUniqueObjectsWithId = <T extends ThingWithId>(objects: T[]) =>
    objects.filter((object, index) => {
        const indexOfFirstMatch = objects.findIndex((candidate) =>
            candidate.equals(object)
        );
        return indexOfFirstMatch === index;
    });

export const useAvailableDeadOponents = (): NonPlayableActor[] => {
    const playerActions = usePlayerActions();
    const lootActions = playerActions.getLootActions();
    const deadOponents = getDeadOponents(lootActions);
    const uniqueInventories = getUniqueObjectsWithId(deadOponents);
    return uniqueInventories;
};

const getDeadOponents = (actions: LootAction[]): NonPlayableActor[] =>
    actions.map((action) => action.getOponent() as NonPlayableActor);

export const useAvailableWeapons = (): Weapon[] => {
    const actionType = useActionType();
    const playerActions = usePlayerActions();
    const actionsToGetWeaponsFrom =
        actionType === 'attack'
            ? playerActions.getAttackActions()
            : playerActions.getReloadActions();
    const weapons = getWeapons(actionsToGetWeaponsFrom);
    const uniqueWeapons = getUniqueObjectsWithId(weapons);
    return uniqueWeapons;
};

const getWeapons = (actions: Array<AttackAction | ReloadAction>) =>
    actions.map((action) => action.getWeapon());
