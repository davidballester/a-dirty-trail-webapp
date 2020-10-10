import React, { useEffect, useState } from 'react';
import { useScene } from '../contexts/gameContext';

const Narration = (): React.ReactElement => {
    const [texts, setTexts] = useState(undefined as string[]);
    const [lastSceneId, setLastSceneId] = useState(undefined as string);
    const scene = useScene();
    useEffect(() => {
        if (scene.id !== lastSceneId) {
            setTexts(scene.setup);
            setLastSceneId(scene.id);
        }
    }, [scene]);
    if (!scene) {
        return null;
    }
    return (
        <>
            {narration.map((text) => (
                <p key={text}>{text}</p>
            ))}
        </>
    );
};

export default Narration;
