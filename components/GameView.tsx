import React, { useState, useEffect } from 'react';
import { useScene } from '../contexts/gameContext';
import Combat from './Combat';
import NarrationView from './NarrationView';

const GameView = () => {
    const scene = useScene();
    const [isCombat, setIsCombat] = useState(false);
    useEffect(() => {
        if (scene) {
            setIsCombat(scene.getHostileActors().length > 0);
        }
    }, [scene]);
    if (isCombat) {
        return <Combat />;
    }
    return <NarrationView />;
};

export default GameView;
