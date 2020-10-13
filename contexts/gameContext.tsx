import React, { useReducer, useEffect, useContext } from 'react';
import {
    Game,
    Action,
    AdvanceToSceneAction,
    Actor,
    AdvanceToActAction,
    Scene,
} from 'a-dirty-trail';

interface State {
    game?: Game;
    playerActions: Action[];
    lastAction?: Action;
    lastOutcome?: any;
}

interface DeltaState {
    game?: Game;
    playerActions?: Action[];
    lastAction?: Action;
    lastOutcome?: any;
}

type Dispatch = (deltaState: DeltaState) => void;

const GameStateContext = React.createContext(undefined as State);
const GameDispatchContext = React.createContext(undefined as Dispatch);

const gameReducer = (state: State, deltaState: DeltaState): State => {
    return {
        ...state,
        ...deltaState,
    };
};

export const GameProvider = ({ children }): React.ReactElement => {
    const [state, dispatch] = useReducer(gameReducer, {
        playerActions: [],
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

const useGameState = (): State => {
    const state = useContext(GameStateContext) as State;
    if (state === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return state;
};

export const useGame = (): Game => {
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

export const usePlayerActions = (): Action[] => {
    const state = useGameState();
    return state.playerActions;
};

export const useOponentsActions = (): Action[] => {
    const game = useGame();
    return game ? game.oponentsActions : [];
};

export const useLastActionAndOutcome = () => {
    const state = useGameState();
    return state.lastAction ? [state.lastAction, state.lastOutcome] : [];
};

export const useGameDispatch = () => {
    const context = React.useContext(GameDispatchContext);
    if (context === undefined) {
        throw new Error('useGameDispatch must be used within a GameProvider');
    }
    return context;
};

export const selectPlayerAction = (
    action: Action,
    game: Game,
    dispatch: Dispatch
): void => {
    if (game.canExecuteAction(action)) {
        const outcome = game.executeAction(action);
        dispatch({
            playerActions: [],
            lastAction: action,
            lastOutcome: outcome,
        });
        const playerAbandonedScene =
            action instanceof AdvanceToSceneAction ||
            action instanceof AdvanceToActAction;
        let nextOponentAction;
        let nextOponentActionOutcome;
        if (!playerAbandonedScene && game.oponentsActions.length) {
            nextOponentAction = game.oponentsActions[0];
            nextOponentActionOutcome = game.executeNextOponentAction();
        }
        setTimeout(() => {
            const playerActions = game.getPlayerActions();
            dispatch({
                lastAction: nextOponentAction,
                lastOutcome: nextOponentActionOutcome,
                playerActions,
            });
        }, 150);
    }
};
