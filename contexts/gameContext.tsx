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
    game?: Game;
    playerActions: Action[];
    sceneActionsAndOutcomes: SceneActionAndOutcome[];
}

interface DeltaState {
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

export const useSelectPlayerAction = () => {
    const state = useGameState();
    const dispatch = useGameDispatch();
    return (action: Action) => selectPlayerAction(action, state, dispatch);
};

const selectPlayerAction = (
    playerAction: Action,
    state: State,
    dispatch: GameDispatch
): void => {
    const game = state.game;
    const playerActionOutcome = game.executeAction(playerAction);
    const playerActionAndOutcome = {
        action: playerAction,
        outcome: playerActionOutcome,
    };
    const isPlayerAbandonedScene =
        playerAction instanceof AdvanceToSceneAction ||
        playerAction instanceof AdvanceToActAction;
    if (isPlayerAbandonedScene) {
        resetActionsForNewScene(game, dispatch);
        return;
    }
    const isOponentActionsAvailable = game.oponentsActions.length > 0;
    if (!isOponentActionsAvailable) {
        advanceSceneTurn(state, dispatch, playerActionAndOutcome);
        return;
    }
    executeOponentActionAndAdvanceSceneTurn(
        state,
        dispatch,
        playerActionAndOutcome
    );
};

const resetActionsForNewScene = (game: Game, dispatch: GameDispatch) => {
    const playerActions = game.getPlayerActions();
    dispatch({
        playerActions,
        sceneActionsAndOutcomes: [],
    });
};

const advanceSceneTurn = (
    state: State,
    dispatch: GameDispatch,
    playerActionAndOutcome: SceneActionAndOutcome
) => {
    const playerActions = state.game.getPlayerActions();
    dispatch({
        playerActions,
        sceneActionsAndOutcomes: [
            ...state.sceneActionsAndOutcomes,
            playerActionAndOutcome,
        ],
    });
};

const executeOponentActionAndAdvanceSceneTurn = (
    state: State,
    dispatch: GameDispatch,
    playerActionAndOutcome: SceneActionAndOutcome
) => {
    const { game } = state;
    const { action: nextOponentAction, outcome: nextOponentActionOutcome } =
        game.executeNextOponentAction() || {};
    const playerActions = game.getPlayerActions();
    dispatch({
        playerActions,
        sceneActionsAndOutcomes: [
            ...state.sceneActionsAndOutcomes,
            playerActionAndOutcome,
            nextOponentActionOutcome !== undefined
                ? {
                      action: nextOponentAction,
                      outcome: nextOponentActionOutcome,
                  }
                : undefined,
        ].filter(Boolean),
    });
};
