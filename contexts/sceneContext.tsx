import React, { useReducer, useContext, ReactElement, useEffect } from 'react';
import { Scene } from 'a-dirty-trail';
import { useNarration } from './narrationContext';
import Actor from 'a-dirty-trail/build/core/Actor';

const SceneContext = React.createContext(undefined as Scene | undefined);

const SceneDispatch = React.createContext(undefined as Dispatch);

type Dispatch = (scene: Scene) => void;

const sceneReducer = (_: Scene, scene: Scene) => scene;

export const SceneProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const [state, dispatch] = useReducer(sceneReducer, undefined);
    const narration = useNarration();
    useEffect(() => {
        if (narration) {
            dispatch(narration.getCurrentScene());
        }
    }, [narration]);
    return (
        <SceneContext.Provider value={state}>
            <SceneDispatch.Provider value={dispatch}>
                {children}
            </SceneDispatch.Provider>
        </SceneContext.Provider>
    );
};

export const useScene = (): Scene => {
    return useContext(SceneContext);
};

export const useUpdateScene = (): (() => void) => {
    const dispatch = useDispatch();
    const narration = useNarration();
    return () => {
        dispatch(narration.getCurrentScene());
    };
};

const useDispatch = (): ((scene: Scene) => void) => {
    return useContext(SceneDispatch);
};

export const usePlayer = (): Actor => {
    const scene = useScene();
    return scene.getPlayer();
};
