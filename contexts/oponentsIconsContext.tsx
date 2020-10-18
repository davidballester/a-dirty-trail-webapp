import { createContext, ReactElement, useContext, useReducer } from 'react';

const allIcons = [
    'oponent-portrait-1.svg',
    'oponent-portrait-2.svg',
    'oponent-portrait-3.svg',
    'oponent-portrait-4.svg',
    'oponent-portrait-5.svg',
] as OponentIcon[];

type OponentIcon = string;

interface OponentsIconsState {
    [oponentName: string]: OponentIcon;
}

interface AddOponentIconSrcAction {
    oponentName: string;
    oponentIcon: OponentIcon;
}

type OponentsIconsDispatch = (
    addOponentIconSrcAction: AddOponentIconSrcAction
) => void;

const OponentsIconsContext = createContext(undefined as OponentsIconsState);
const OponentsIconsDispatchContext = createContext(
    undefined as OponentsIconsDispatch
);

const oponentsIconsReducer = (
    state: OponentsIconsState,
    { oponentName, oponentIcon }: AddOponentIconSrcAction
): OponentsIconsState => {
    return {
        ...state,
        [oponentName]: oponentIcon,
    };
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
                {children}
            </OponentsIconsDispatchContext.Provider>
        </OponentsIconsContext.Provider>
    );
};

const useOponentsIconsState = () => {
    const state = useContext(OponentsIconsContext) as OponentsIconsState;
    if (state === undefined) {
        throw new Error(
            'useOponentsIconsState must be used within an OponentsIconsContext'
        );
    }
    return state;
};

const useOponentsIconsDispatch = () => {
    const dispatch = useContext(OponentsIconsDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'useOponentsIconsDispatch must be used within an OponentsIconsDispatchContext'
        );
    }
    return dispatch;
};

export const useOponentIcon = (oponentName: string) => {
    const dispatch = useOponentsIconsDispatch();
    const oponentsIcons = useOponentsIconsState();
    if (oponentsIcons[oponentName]) {
        return oponentsIcons[oponentName];
    }
    const oponentIcon = getOponentIcon(oponentsIcons);
    storeOponentIcon(oponentName, oponentIcon, dispatch);
    return oponentIcon;
};

const getOponentIcon = (oponentsIcons: OponentsIconsState) => {
    const iconsAvailable = getIconsAvailable(oponentsIcons);
    return getRandomIcon(iconsAvailable);
};

const getIconsAvailable = (oponentsIcons: OponentsIconsState) => {
    const iconsTaken = getIconsTaken(oponentsIcons);
    return differenceBetween(allIcons, iconsTaken);
};

const getIconsTaken = (oponentsIcons: OponentsIconsState) =>
    Object.keys(oponentsIcons).map((oponentName) => oponentsIcons[oponentName]);

const differenceBetween = (superSet: OponentIcon[], subset: OponentIcon[]) =>
    superSet.filter((icon) => subset.indexOf(icon) === -1);

const storeOponentIcon = (
    oponentName: string,
    oponentIcon: OponentIcon,
    dispatch: OponentsIconsDispatch
) => setTimeout(() => dispatch({ oponentName, oponentIcon }), 0); // We want the change state caused by dispatch to happen asynchronously

const getRandomIcon = (icons: OponentIcon[]) => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
};
