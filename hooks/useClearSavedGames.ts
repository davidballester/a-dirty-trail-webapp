import cookie from 'cookie';
import { SAVED_GAME_COOKIE } from '../helpers/constants';

const useClearSavedGames = (): (() => void) => {
    return () => {
        const cookies = cookie.parse(document.cookie);
        const savedGameCookie = cookies[SAVED_GAME_COOKIE];
        if (!savedGameCookie) {
            return;
        }
        const deleteSavedGameCookie = cookie.serialize(
            SAVED_GAME_COOKIE,
            savedGameCookie,
            { expires: new Date(0) }
        );
        document.cookie = deleteSavedGameCookie;
    };
};

export default useClearSavedGames;
