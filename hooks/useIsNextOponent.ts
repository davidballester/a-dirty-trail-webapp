import { NonPlayableActor } from 'a-dirty-trail/build';
import { useOponentsActions } from '../contexts/gameContext';

const useIsNextOponent = (oponent: NonPlayableActor) => {
    const oponentsActions = useOponentsActions();
    const isNextOponent =
        !!oponentsActions.length && oponentsActions[0].player.id === oponent.id;
    return isNextOponent;
};

export default useIsNextOponent;
