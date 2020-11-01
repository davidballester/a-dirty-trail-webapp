import React, { useReducer, useContext, ReactElement, useEffect } from 'react';
import { NarrativeSceneEngine } from 'a-dirty-trail';
import { useNarration } from './narrationContext';

const NarrativeSceneEngineContext = React.createContext(
    undefined as NarrativeSceneEngine
);

const narrativeSceneEngineReducer = (
    old: NarrativeSceneEngine,
    newNarrativeSceneEngine: NarrativeSceneEngine
): NarrativeSceneEngine => newNarrativeSceneEngine;

export const NarrativeSceneEngineProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const narration = useNarration();
    const scene = narration.getCurrentScene();
    const [state, dispatch] = useReducer(
        narrativeSceneEngineReducer,
        new NarrativeSceneEngine({ scene })
    );
    useEffect(() => {
        dispatch(new NarrativeSceneEngine({ scene }));
    }, [scene]);
    return (
        <NarrativeSceneEngineContext.Provider value={state}>
            {children}
        </NarrativeSceneEngineContext.Provider>
    );
};

export const useNarrativeSceneEngine = (): NarrativeSceneEngine => {
    const narrativeSceneEngine = useContext(
        NarrativeSceneEngineContext
    ) as NarrativeSceneEngine;
    if (!narrativeSceneEngine) {
        throw new Error(
            'useNarrativeSceneEngine must be used within a NarrativeSceneEngineProvider'
        );
    }
    return narrativeSceneEngine;
};
