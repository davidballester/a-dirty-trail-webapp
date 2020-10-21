import { createContext, ReactElement, useContext, useReducer } from 'react';

export enum GameViewMode {
    narration,
    combat,
}

type GameViewModeDispatch = () => void;

const GameViewModeContext = createContext(undefined as GameViewMode);
const GameViewModeDispatchContext = createContext(
    undefined as GameViewModeDispatch
);

const gameReducer = (viewMode: GameViewMode): GameViewMode => {
    switch (viewMode) {
        case GameViewMode.narration: {
            return GameViewMode.combat;
        }
        default: {
            return GameViewMode.narration;
        }
    }
};

export const GameViewModeProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const [state, dispatch] = useReducer(gameReducer, GameViewMode.narration);
    return (
        <GameViewModeContext.Provider value={state}>
            <GameViewModeDispatchContext.Provider value={dispatch}>
                {children}
            </GameViewModeDispatchContext.Provider>
        </GameViewModeContext.Provider>
    );
};

export const useGameViewMode = (): GameViewMode => {
    const gameViewMode = useContext(GameViewModeContext) as GameViewMode;
    if (gameViewMode === undefined) {
        throw new Error(
            'useGameViewMode must be used within a GameViewModeProvider'
        );
    }
    return gameViewMode;
};

export const useToggleGameViewMode = (): GameViewModeDispatch => {
    const gameViewModeDispatch = useContext(GameViewModeDispatchContext);
    if (gameViewModeDispatch === undefined) {
        throw new Error(
            'useGameDispatch must be used within a GameViewModeProvider'
        );
    }
    return gameViewModeDispatch;
};
