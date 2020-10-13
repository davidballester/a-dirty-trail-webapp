import { AdvanceToActAction, AdvanceToSceneAction } from 'a-dirty-trail/build';
import React, { useEffect, useState } from 'react';
import { useLastActionAndOutcome, useScene } from '../contexts/gameContext';

const Narration = (): React.ReactElement => {
    const [texts, setTexts] = useState([] as string[]);
    const [lastSceneId, setLastSceneId] = useState(undefined as string);
    const [lastAction, lastOutcome] = useLastActionAndOutcome();
    const scene = useScene();
    useEffect(() => {
        console.log('useEffect - scene', scene ? scene.setup : []);
        if (scene && scene.id !== lastSceneId) {
            setLastSceneId(scene.id);
            setTexts(scene.setup);
        }
    }, [scene]);
    useEffect(() => {
        if (
            lastAction &&
            !(lastAction instanceof AdvanceToActAction) &&
            !(lastAction instanceof AdvanceToSceneAction)
        ) {
            setTexts([...texts, lastAction.getName()]);
        }
    }, [lastAction, lastOutcome]);
    if (!scene) {
        return null;
    }
    console.log(texts);
    return (
        <section>
            {texts.map((text) => (
                <p key={text}>{text}</p>
            ))}
        </section>
    );
};

export default Narration;
