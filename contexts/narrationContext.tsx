import React, {
    useReducer,
    useContext,
    ReactElement,
    useState,
    useEffect,
} from 'react';
import { Narration, Scene } from 'a-dirty-trail';
import MyNarrationsCatalogue from '../helpers/MyNarrationsCatalogue';
import MySceneTemplateResolver from '../helpers/MySceneTemplateResolver';

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
    useEffect(() => {
        narrationsCatalogue.fetchNarrations().then(async (narrations) => {
            let narration = narrations[0];
            narration = await narrationsCatalogue.initializeNarration(
                narration
            );
            dispatch(narration);
        });
    }, []);
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
