import React, {
    useReducer,
    useContext,
    ReactElement,
    useState,
    useEffect,
    Dispatch,
} from 'react';
import { Narration, NarrationsCatalogue, Scene } from 'a-dirty-trail';
import MyNarrationsCatalogue from '../helpers/MyNarrationsCatalogue';
import MySceneTemplateResolver from '../helpers/MySceneTemplateResolver';
import { NarrationTemplate } from 'a-dirty-trail/build/templateSystem/NarrationTemplate';
import cookie from 'cookie';
import { SAVED_GAME_COOKIE } from '../helpers/constants';

const NarrationContext = React.createContext(
    undefined as Narration | undefined
);

const narrationReducer = (_: Narration, narration: Narration) => narration;

export const NarrationProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): React.ReactElement => {
    const [narrationsCatalogue] = useState(
        new MyNarrationsCatalogue({
            sceneTemplateResolver: new MySceneTemplateResolver(),
        })
    );

    const [state, dispatch] = useReducer(narrationReducer, undefined);
    useLoadNarration(narrationsCatalogue, dispatch);
    return (
        <NarrationContext.Provider value={state}>
            {children}
        </NarrationContext.Provider>
    );
};

export const useNarration = (): Narration | undefined => {
    return useContext(NarrationContext) as Narration;
};

export const useScene = (): Scene | undefined => {
    const narration = useNarration();
    return narration ? narration.getCurrentScene() : undefined;
};

const useLoadNarration = (
    narrationsCatalogue: NarrationsCatalogue,
    dispatch: Dispatch<Narration>
): void => {
    if (!process.browser) {
        return;
    }
    const savedNarrationTemplate = useSavedNarrationTemplate();
    useEffect(() => {
        if (savedNarrationTemplate) {
            loadSavedNarration(
                narrationsCatalogue,
                savedNarrationTemplate,
                dispatch
            );
        } else {
            loadDefaultNarration(narrationsCatalogue, dispatch);
        }
    }, []);
};

const useSavedNarrationTemplate = (): NarrationTemplate | undefined => {
    const cookies = cookie.parse(document.cookie);
    const savedGame = cookies[SAVED_GAME_COOKIE];
    if (!savedGame) {
        return undefined;
    }
    return JSON.parse(savedGame);
};

const loadSavedNarration = async (
    narrationsCatalogue: NarrationsCatalogue,
    savedNarrationTemplate: NarrationTemplate,
    dispatch: Dispatch<Narration>
): Promise<void> => {
    const narration = await narrationsCatalogue.loadNarration(
        savedNarrationTemplate
    );
    dispatch(narration);
};

const loadDefaultNarration = async (
    narrationsCatalogue: NarrationsCatalogue,
    dispatch: Dispatch<Narration>
): Promise<void> => {
    const narrations = await narrationsCatalogue.fetchNarrations();
    let narration = narrations[0];
    narration = await narrationsCatalogue.initializeNarration(narration);
    dispatch(narration);
};
