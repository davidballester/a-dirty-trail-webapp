import {
    Action,
    AttackAction,
    Inventory,
    LootAction,
    NonPlayableActor,
    ReloadAction,
    Weapon,
} from 'a-dirty-trail/build';
import { createContext, ReactElement, useContext, useReducer } from 'react';
import { usePlayerActions } from './gameContext';

export type ActionType = 'attack' | 'reload' | 'loot';
export interface CombatActionSelectionState {
    actionType?: ActionType;
    oponent?: NonPlayableActor;
    inventory?: Inventory;
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

interface SelectInventory {
    type: 'selectInventory';
    payload: Inventory;
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
    | SelectInventory
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
        case 'selectInventory': {
            return {
                ...state,
                inventory: action.payload,
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

export const useActionType = () => {
    const state = useState();
    return state.actionType;
};

export const useOponent = () => {
    const state = useState();
    return state.oponent;
};

export const useInventory = () => {
    const state = useState();
    return state.inventory;
};

export const useWeapon = () => {
    const state = useState();
    return state.weapon;
};

export const useIsSelectionComplete = () => {
    const state = useState();
    if (!state.actionType) {
        return false;
    }
    switch (state.actionType) {
        case 'attack': {
            return !!state.oponent && !!state.weapon;
        }
        case 'loot': {
            return !!state.inventory;
        }
        case 'reload': {
            return !!state.weapon;
        }
    }
};

export const useSelectedPlayerAction = () => {
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
    playerActions: Action[],
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
    playerActions: Action[],
    state: CombatActionSelectionState
) =>
    playerActions
        .filter((action) => action instanceof AttackAction)
        .map((action) => action as AttackAction)
        .filter((action) => action.oponent.id === state.oponent.id)
        .find((action) => action.weapon.id === state.weapon.id);

const findPlayerReloadActionSelected = (
    playerActions: Action[],
    state: CombatActionSelectionState
) =>
    playerActions
        .filter((action) => action instanceof ReloadAction)
        .map((action) => action as ReloadAction)
        .find((action) => action.weapon.id === state.weapon.id);

const findLootActionSelected = (
    playerActions: Action[],
    state: CombatActionSelectionState
) =>
    playerActions
        .filter((action) => action instanceof LootAction)
        .map((action) => action as LootAction)
        .find((action) => action.inventory.id === state.inventory.id);

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

export const useClearSelection = () => {
    const dispatch = useDispatch();
    return () =>
        dispatch({
            type: 'clearSelection',
        });
};

export const useSelectActionType = () => {
    const dispatch = useDispatch();
    return (actionType: ActionType) =>
        dispatch({
            type: 'selectActionType',
            payload: actionType,
        });
};

export const useSelectOponent = () => {
    const dispatch = useDispatch();
    return (oponent: NonPlayableActor) =>
        dispatch({
            type: 'selectOponent',
            payload: oponent,
        });
};

export const useSelectInventory = () => {
    const dispatch = useDispatch();
    return (inventory: Inventory) =>
        dispatch({
            type: 'selectInventory',
            payload: inventory,
        });
};

export const useSelectWeapon = () => {
    const dispatch = useDispatch();
    return (weapon: Weapon) =>
        dispatch({
            type: 'selectWeapon',
            payload: weapon,
        });
};

export const useAvailableActionTypes = () => {
    const playerActions = usePlayerActions();
    const actionTypes = playerActions
        .map(mapActionToActionType)
        .filter(Boolean);
    const uniqueActionTypes = getUniqueActionTypes(actionTypes);
    return uniqueActionTypes;
};

const mapActionToActionType = (action: Action): ActionType => {
    if (action instanceof AttackAction) {
        return 'attack';
    }
    if (action instanceof ReloadAction) {
        return 'reload';
    }
    if (action instanceof LootAction) {
        return 'loot';
    }
    return undefined;
};

const getUniqueActionTypes = (actionTypes: ActionType[]) => {
    const actionTypesSet = new Set(actionTypes);
    return Array.from(actionTypesSet);
};

export const useAvailableOponents = () => {
    const playerActions = usePlayerActions();
    const attackActions = getAttackActions(playerActions);
    const oponents = getOponents(attackActions);
    const uniqueOponents = getUniqueObjectsWithId(oponents);
    return uniqueOponents;
};

const getAttackActions = (action: Action[]) =>
    action
        .filter((action) => action instanceof AttackAction)
        .map((action) => action as AttackAction);

const getOponents = (actions: AttackAction[]) =>
    actions.map((action) => action.oponent);

const getUniqueObjectsWithId = <T extends { id: string }>(objects: T[]) =>
    objects.filter(({ id }, index) => {
        const indexOfFirstMatch = objects.findIndex(
            (candidate) => candidate.id === id
        );
        return indexOfFirstMatch === index;
    });

export const useAvailableInventories = () => {
    const playerActions = usePlayerActions();
    const lootActions = getLootActions(playerActions);
    const inventories = getInventories(lootActions);
    const uniqueInventories = getUniqueObjectsWithId(inventories);
    return uniqueInventories;
};

const getLootActions = (action: Action[]) =>
    action
        .filter((action) => action instanceof LootAction)
        .map((action) => action as LootAction);

const getInventories = (actions: LootAction[]) =>
    actions.map((action) => action.inventory);

export const useAvailableWeapons = () => {
    const actionType = useActionType();
    const playerActions = usePlayerActions();
    const actionsToGetWeaponsFrom =
        actionType === 'attack'
            ? getAttackActions(playerActions)
            : getReloadActions(playerActions);
    const weapons = getWeapons(actionsToGetWeaponsFrom);
    const uniqueWeapons = getUniqueObjectsWithId(weapons);
    return uniqueWeapons;
};

const getWeapons = (actions: { weapon: Weapon }[]) =>
    actions.map((action) => action.weapon);

const getReloadActions = (action: Action[]) =>
    action
        .filter((action) => action instanceof ReloadAction)
        .map((action) => action as ReloadAction);
