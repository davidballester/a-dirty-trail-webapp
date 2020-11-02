import React, { useReducer, useContext, ReactElement, useEffect } from 'react';
import { CombatSceneEngine, Scene } from 'a-dirty-trail';
import Actor from 'a-dirty-trail/build/core/Actor';
import Action from 'a-dirty-trail/build/actions/Action';
import ActionsMap from 'a-dirty-trail/build/core/ActionsMap';
import { useScene as useNarrativeSceneEngineScene } from './narrativeSceneEngineContext';

type Dispatch = (newState: State) => void;

type State = {
    combatSceneEngine: CombatSceneEngine;
    scene: Scene;
    player: Actor;
    isPlayerTurn: boolean;
    lastAction?: Action<any>;
    lastOutcome?: any;
};

const CombatSceneEngineContext = React.createContext(undefined as State);

const CombatSceneEngineDispatch = React.createContext(undefined as Dispatch);

const combatSceneEngineReducer = (oldState: State, newState: State): State =>
    newState;

export const CombatSceneEngineProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const scene = useNarrativeSceneEngineScene();
    const player = scene ? scene.getPlayer() : undefined;
    const combatSceneEngine = scene
        ? new CombatSceneEngine({ scene })
        : undefined;
    const isPlayerTurn = combatSceneEngine
        ? combatSceneEngine.isPlayerTurn()
        : false;
    const [state, dispatch] = useReducer(combatSceneEngineReducer, {
        scene,
        player,
        isPlayerTurn,
        combatSceneEngine,
    });
    useEffect(() => {
        if (scene && player) {
            const combatSceneEngine = new CombatSceneEngine({ scene });
            dispatch({
                scene,
                player,
                isPlayerTurn: combatSceneEngine.isPlayerTurn(),
                combatSceneEngine,
            });
        }
    }, [scene, player]);
    return (
        <CombatSceneEngineContext.Provider value={state}>
            <CombatSceneEngineDispatch.Provider value={dispatch}>
                {children}
            </CombatSceneEngineDispatch.Provider>
        </CombatSceneEngineContext.Provider>
    );
};

export const useCombatSceneEngine = (): CombatSceneEngine => {
    const state = useState();
    return state.combatSceneEngine;
};

const useState = (): State => {
    const state = useContext(CombatSceneEngineContext);
    if (!state) {
        throw new Error(
            'useCombatSceneEngine must be used within a CombatSceneEngineProvider'
        );
    }
    return state;
};

export const useScene = (): Scene => {
    const state = useState();
    return state.scene;
};

export const usePlayer = (): Actor => {
    const state = useState();
    return state.player;
};

export const useIsPlayerTurn = (): boolean => {
    const state = useState();
    return state.isPlayerTurn;
};

export const useExecuteNextOponentAction = (): (() => Promise<
    [Action<any>, any]
>) => {
    const combatSceneEngine = useCombatSceneEngine();
    const player = usePlayer();
    const scene = useScene();
    const dispatch = useDispatch();
    return async () => {
        const [
            action,
            outcome,
        ] = await combatSceneEngine.executeNextOponentAction();
        dispatch({
            combatSceneEngine,
            player,
            isPlayerTurn: combatSceneEngine.isPlayerTurn(),
            scene,
            lastAction: action,
            lastOutcome: outcome,
        });
        return [action, outcome];
    };
};

export const useExecutePlayerAction = (): (<T>(
    action: Action<T>
) => Promise<T>) => {
    const combatSceneEngine = useCombatSceneEngine();
    const player = usePlayer();
    const scene = useScene();
    const dispatch = useDispatch();
    return async (action: Action<any>) => {
        const outcome = await combatSceneEngine.executePlayerAction(action);
        dispatch({
            combatSceneEngine,
            player,
            isPlayerTurn: combatSceneEngine.isPlayerTurn(),
            scene,
            lastAction: action,
            lastOutcome: outcome,
        });
        return outcome;
    };
};

const useDispatch = (): Dispatch => {
    const dispatch = useContext(CombatSceneEngineDispatch);
    if (!dispatch) {
        throw new Error(
            'useDispatch must be used within a CombatSceneEngineProvider'
        );
    }
    return dispatch;
};

export const useLastActionAndOutcome = (): [Action<any>, any] => {
    const state = useState();
    const { lastAction, lastOutcome } = state;
    return [lastAction, lastOutcome];
};

export const usePlayerActions = (): ActionsMap => {
    const combatSceneEngine = useCombatSceneEngine();
    return combatSceneEngine.getPlayerActions();
};
