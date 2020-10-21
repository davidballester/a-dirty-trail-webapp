import { useScene } from '../contexts/gameContext';

const useIsCombat = (): boolean => {
    const scene = useScene();
    return scene.getHostileActors().length > 0;
};

export default useIsCombat;
