import React, { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import cookie from 'cookie';
import { SAVED_GAME_COOKIE } from '../helpers/constants';

const Settings = (): ReactElement => (
    <article>
        <header>
            <h2>Settings</h2>
        </header>
        <ClearSavedGames />
    </article>
);

export default Settings;

const ClearSavedGames = (): ReactElement => {
    const clearSavedGames = useClearSavedGames();
    return (
        <p>
            <Button variant="outline-dark" onClick={clearSavedGames} block>
                Remove saved games
            </Button>
            <small>Watch out! You current progress will be lost.</small>
        </p>
    );
};

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
