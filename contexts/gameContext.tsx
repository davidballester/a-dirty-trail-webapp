import React, { useReducer, useEffect, useContext } from 'react';
import {
    Game,
    Action,
    AdvanceToSceneAction,
    Actor,
    AdvanceToActAction,
    Scene,
} from 'a-dirty-trail';

export interface SceneActionAndOutcome {
    action: Action;
    outcome: any;
}

interface State {
    canPlayerAct: boolean;
    game?: Game;
    playerActions: Action[];
    sceneActionsAndOutcomes: SceneActionAndOutcome[];
}

interface DeltaState {
    canPlayerAct?: boolean;
    game?: Game;
    playerActions?: Action[];
    sceneActionsAndOutcomes?: SceneActionAndOutcome[];
}

type GameDispatch = (deltaState: DeltaState) => void;

const GameStateContext = React.createContext(undefined as State);
const GameDispatchContext = React.createContext(undefined as GameDispatch);

const gameReducer = (state: State, deltaState: DeltaState): State => {
    return {
        ...state,
        ...deltaState,
    };
};

export const GameProvider = ({ children }): React.ReactElement => {
    const [state, dispatch] = useReducer(gameReducer, {
        canPlayerAct: true,
        playerActions: [],
        sceneActionsAndOutcomes: [],
    });
    useEffect(() => {
        const game = new Game('Find Timmy');
        const playerActions = game.getPlayerActions();
        dispatch({
            game,
            playerActions,
        });
    }, []);
    return (
        <GameStateContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameStateContext.Provider>
    );
};

const useGameState = () => {
    const state = useContext(GameStateContext) as State;
    if (state === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return state;
};

export const useGame = () => {
    const state = useGameState();
    return state.game;
};

export const usePlayer = (): Actor | undefined => {
    const game = useGame();
    return game ? game.player : undefined;
};

export const useScene = (): Scene | undefined => {
    const game = useGame();
    return game ? game.currentScene : undefined;
};

export const usePlayerActions = () => {
    const state = useGameState();
    return state.playerActions;
};

export const useOponentsActions = () => {
    const game = useGame();
    return game ? game.oponentsActions : [];
};

export const useSceneActionsAndOutcomes = () => {
    const state = useGameState();
    return state.sceneActionsAndOutcomes;
};

export const useGameDispatch = () => {
    const context = React.useContext(GameDispatchContext);
    if (context === undefined) {
        throw new Error('useGameDispatch must be used within a GameProvider');
    }
    return context;
};

export const useCanPlayerAct = () => {
    const state = useGameState();
    return state.canPlayerAct;
};

export const useExecutePlayerAction = () => {
    const state = useGameState();
    const dispatch = useGameDispatch();
    return (action: Action) => executePlayerAction(action, state, dispatch);
};

export const useExecuteNextOponentAction = () => {
    const state = useGameState();
    const dispatch = useGameDispatch();
    return () => executeNextOponentAction(state, dispatch);
};

const executePlayerAction = (
    playerAction: Action,
    state: State,
    dispatch: GameDispatch
): void => {
    if (!state.canPlayerAct) {
        return;
    }
    const game = state.game;
    const playerActionOutcome = game.executeAction(playerAction);
    if (isPlayerAbandonedScene(playerAction)) {
        resetActionsForNewScene(game, dispatch);
    } else {
        pushOutcomeToStateAndPrepareForOponentAction(
            state,
            dispatch,
            playerAction,
            playerActionOutcome,
            state.playerActions,
            false
        );
    }
};

const isPlayerAbandonedScene = (action: Action) =>
    action instanceof AdvanceToSceneAction ||
    action instanceof AdvanceToActAction;

const pushOutcomeToStateAndPrepareForOponentAction = (
    state: State,
    dispatch: GameDispatch,
    action: Action,
    outcome: any,
    playerActions: Action[],
    canPlayerAct: boolean
) => {
    const sceneActionsAndOutcomes = [...state.sceneActionsAndOutcomes];
    if (outcome !== undefined) {
        sceneActionsAndOutcomes.push({
            action: action,
            outcome: outcome,
        });
    }
    dispatch({
        canPlayerAct,
        playerActions,
        sceneActionsAndOutcomes: sceneActionsAndOutcomes,
    });
};

const resetActionsForNewScene = (game: Game, dispatch: GameDispatch) => {
    const playerActions = game.getPlayerActions();
    dispatch({
        playerActions,
        sceneActionsAndOutcomes: [],
    });
};

const executeNextOponentAction = (state: State, dispatch: GameDispatch) => {
    if (state.canPlayerAct) {
        return;
    }
    const game = state.game;
    if (isOponentActionAvailable(game)) {
        const { action: nextOponentAction, outcome: nextOponentActionOutcome } =
            game.executeNextOponentAction() || {};
        const playerActions = game.getPlayerActions();
        pushOutcomeToStateAndPrepareForOponentAction(
            state,
            dispatch,
            nextOponentAction,
            nextOponentActionOutcome,
            playerActions,
            true
        );
    }
};

const isOponentActionAvailable = (game: Game) =>
    game.oponentsActions.length > 0;
