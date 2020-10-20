import { useEffect } from 'react';
import { useScene } from '../contexts/gameContext';

const useOponentIcon = (oponentName: string) => {
    useClearOponentIconsMapOnSceneChange();
    if (!oponentIconsMap[oponentName]) {
        oponentIconsMap[oponentName] = initializeOponentIcon();
    }
    return oponentIconsMap[oponentName];
};

export default useOponentIcon;

type OponentIcon = string;
interface OponentIconMap {
    [oponentName: string]: OponentIcon;
}

let oponentIconsMap = {} as OponentIconMap;
const allIcons = [
    'oponent-portrait-1.svg',
    'oponent-portrait-2.svg',
    'oponent-portrait-3.svg',
    'oponent-portrait-4.svg',
    'oponent-portrait-5.svg',
] as OponentIcon[];

const useClearOponentIconsMapOnSceneChange = () => {
    const scene = useScene();
    useEffect(() => {
        oponentIconsMap = {};
    }, [scene]);
};

const initializeOponentIcon = () => {
    const iconsTaken = getIconsTaken();
    const iconsAvailable = getIconsAvailable(iconsTaken);
    return randomIcon(iconsAvailable);
};

const getIconsTaken = () =>
    Object.keys(oponentIconsMap).map(
        (oponentName) => oponentIconsMap[oponentName]
    );

const getIconsAvailable = (iconsTaken) =>
    allIcons.filter((icon) => iconsTaken.indexOf(icon) === -1);

const randomIcon = (icons) => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
};
