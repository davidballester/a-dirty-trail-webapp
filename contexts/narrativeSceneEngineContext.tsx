import React, { useReducer, useContext, ReactElement, useEffect } from 'react';
import { NarrativeSceneEngine, Scene } from 'a-dirty-trail';
import { useNarration } from './narrationContext';
import Action from 'a-dirty-trail/build/actions/Action';
import Actor from 'a-dirty-trail/build/core/Actor';

type Dispatch = (newState: State) => void;

type State = {
    narrativeSceneEngine: NarrativeSceneEngine;
    scene: Scene;
    player: Actor;
};

const NarrativeSceneEngineContext = React.createContext(undefined as State);

const NarrativeSceneEngineDispatch = React.createContext(undefined as Dispatch);

const narrativeSceneEngineReducer = (oldState: State, newState: State): State =>
    newState;

export const NarrativeSceneEngineProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const narration = useNarration();
    const scene = narration.getCurrentScene();
    const player = scene.getPlayer();
    const [state, dispatch] = useReducer(narrativeSceneEngineReducer, {
        scene,
        player,
        narrativeSceneEngine: new NarrativeSceneEngine({ scene }),
    });
    useEffect(() => {
        if (scene && player) {
            dispatch({
                scene,
                player,
                narrativeSceneEngine: new NarrativeSceneEngine({ scene }),
            });
        }
    }, [scene, player]);
    return (
        <NarrativeSceneEngineContext.Provider value={state}>
            <NarrativeSceneEngineDispatch.Provider value={dispatch}>
                {children}
            </NarrativeSceneEngineDispatch.Provider>
        </NarrativeSceneEngineContext.Provider>
    );
};

export const useNarrativeSceneEngine = (): NarrativeSceneEngine => {
    const state = useState();
    return state.narrativeSceneEngine;
};

const useState = (): State => {
    const state = useContext(NarrativeSceneEngineContext);
    if (!state) {
        throw new Error(
            'useNarrativeSceneEngine must be used within a NarrativeSceneEngineProvider'
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

export const useExecutePlayerAction = (): ((
    action: Action<any>
) => Promise<void>) => {
    const dispatch = useDispatch();
    const narration = useNarration();
    const narrativeSceneEngine = useNarrativeSceneEngine();
    return async (action: Action<any>) => {
        await narrativeSceneEngine.executePlayerAction(action);
        const scene = narration.getCurrentScene();
        const player = scene.getPlayer();
        dispatch({
            scene,
            player,
            narrativeSceneEngine: new NarrativeSceneEngine({ scene }),
        });
    };
};

const useDispatch = (): Dispatch => {
    const dispatch = useContext(NarrativeSceneEngineDispatch);
    if (!dispatch) {
        throw new Error(
            'useDispatch must be used within a NarrativeSceneEngineProvider'
        );
    }
    return dispatch;
};
