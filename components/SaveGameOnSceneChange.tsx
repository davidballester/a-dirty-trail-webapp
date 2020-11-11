import React, { ReactElement, useEffect } from 'react';
import cookie from 'cookie';
import { SAVED_GAME_COOKIE } from '../helpers/constants';
import { NarrationTemplate } from 'a-dirty-trail/build/templateSystem/NarrationTemplate';
import { useScene } from '../contexts/narrativeSceneEngineContext';
import { useNarration } from '../contexts/narrationContext';

const SaveGameOnSceneChange = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    useSaveGameOnSceneChanged();
    return <>{children}</>;
};

export default SaveGameOnSceneChange;

const useSaveGameOnSceneChanged = (): void => {
    const scene = useScene();
    const narration = useNarration();
    useEffect(() => {
        if (scene) {
            const narrationTemplate = narration.save();
            if (narrationTemplate) {
                saveGame(narrationTemplate);
            }
        }
    }, [scene, narration]);
};

const saveGame = (narrationTemplate: NarrationTemplate): void => {
    const eightyYearsInSeconds = 80 * 365 * 24 * 60 * 60;
    const savedGameCookie = cookie.serialize(
        SAVED_GAME_COOKIE,
        JSON.stringify(narrationTemplate),
        { maxAge: eightyYearsInSeconds }
    );
    document.cookie = savedGameCookie;
};
