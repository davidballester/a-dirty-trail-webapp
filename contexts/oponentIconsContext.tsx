import React, {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { useScene } from './gameContext';

const allIcons = [
    'oponent-portrait-1.svg',
    'oponent-portrait-2.svg',
    'oponent-portrait-3.svg',
    'oponent-portrait-4.svg',
    'oponent-portrait-5.svg',
] as OponentIconSrc[];

type OponentIconSrc = string;
export interface OponentIconsState {
    [oponentName: string]: OponentIconSrc;
}

interface CreateOponentIcon {
    type: 'createOponentIcon';
    payload: {
        oponentName: string;
    };
}

interface ClearOponentsIcons {
    type: 'clearOponentsIcons';
}

type Action = CreateOponentIcon | ClearOponentsIcons;
type OponentIconsDispatch = (action: Action) => void;

const OponentsIconsContext = createContext(undefined as OponentIconsState);
const OponentsIconsDispatchContext = createContext(
    undefined as OponentIconsDispatch
);

const oponentsIconsReducer = (
    state: OponentIconsState,
    action: Action
): OponentIconsState => {
    switch (action.type) {
        case 'clearOponentsIcons': {
            return {};
        }
        case 'createOponentIcon': {
            const newIcon = getNewIcon(state);
            const { oponentName } = action.payload;
            return {
                ...state,
                [oponentName]: newIcon,
            };
        }
    }
};

export const OponentsIconsProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const [state, dispatch] = useReducer(oponentsIconsReducer, {});
    return (
        <OponentsIconsContext.Provider value={state}>
            <OponentsIconsDispatchContext.Provider value={dispatch}>
                <ClearOponentsIconsOnSceneChange />
                {children}
            </OponentsIconsDispatchContext.Provider>
        </OponentsIconsContext.Provider>
    );
};

const ClearOponentsIconsOnSceneChange = () => {
    useClearOponentIconsOnSceneChange();
    return null;
};

const useClearOponentIconsOnSceneChange = () => {
    const [lastSceneId, setLastSceneId] = useState(undefined);
    const scene = useScene();
    const clearOponentsIcons = useClearOponentsIcons();
    useEffect(() => {
        if (scene && scene.id !== lastSceneId) {
            clearOponentsIcons();
            setLastSceneId(scene.id);
        }
    }, [scene, lastSceneId]);
};

const useClearOponentsIcons = () => {
    const dispatch = useDispatch();
    return () => dispatch({ type: 'clearOponentsIcons' });
};

const useDispatch = () => {
    const dispatch = useContext(OponentsIconsDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'useDispatch must be used within a OponentsIconsDispatchContext'
        );
    }
    return dispatch;
};

const useOponentsIcons = () => {
    const state = useContext(OponentsIconsContext);
    if (state === undefined) {
        throw new Error(
            'useOponentsIcons must be used within a OponentsIconsDispatchContext'
        );
    }
    return state;
};

export const useOponentIcon = (oponentName: string) => {
    const dispatch = useDispatch();
    const state = useOponentsIcons();
    const existingIcon = state[oponentName];
    if (!!existingIcon) {
        return existingIcon;
    }
    setTimeout(() =>
        dispatch({
            type: 'createOponentIcon',
            payload: {
                oponentName,
            },
        })
    );
};

const getNewIcon = (state: OponentIconsState) => {
    const iconsTaken = getIconsTaken(state);
    const iconsAvailable = getIconsAvailable(iconsTaken);
    return randomIcon(iconsAvailable);
};

const getIconsTaken = (state: OponentIconsState): OponentIconSrc[] =>
    Object.keys(state).map((oponentName) => state[oponentName]);

const getIconsAvailable = (iconsTaken: OponentIconSrc[]): OponentIconSrc[] =>
    allIcons.filter((icon) => iconsTaken.indexOf(icon) === -1);

const randomIcon = (icons) => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
};
