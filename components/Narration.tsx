import React, { useEffect, useState } from 'react';
import {
    SceneActionAndOutcome,
    useScene,
    useSceneActionsAndOutcomes,
} from '../contexts/gameContext';
import ActionNarration from './ActionNarration';

const Narration = (): React.ReactElement => {
    const scene = useScene();
    const [lastActionId, setLastActionId] = useState(undefined as string);
    const [lastSceneId, setLastSceneId] = useState(
        scene ? scene.id : (undefined as string)
    );
    const [
        latestSceneActionsAndOutcomes,
        setLatestSceneActionsAndOutcomes,
    ] = useState([] as SceneActionAndOutcome[]);
    const sceneActionsAndOutcomes = useSceneActionsAndOutcomes();
    useEffect(() => {
        if (scene && lastSceneId !== scene.id) {
            setLastSceneId(scene.id);
            setLatestSceneActionsAndOutcomes([]);
        }
    }, [scene]);
    useEffect(() => {
        if (sceneActionsAndOutcomes && sceneActionsAndOutcomes.length) {
            if (!lastActionId) {
                setLastActionId(
                    sceneActionsAndOutcomes[sceneActionsAndOutcomes.length - 1]
                        .action.id
                );
                setLatestSceneActionsAndOutcomes(sceneActionsAndOutcomes);
            } else {
                const lastIndex = sceneActionsAndOutcomes.findIndex(
                    ({ action }) => action.id === lastActionId
                );
                const latest = sceneActionsAndOutcomes.slice(lastIndex + 1);
                setLastActionId(latest[latest.length - 1].action.id);
                setLatestSceneActionsAndOutcomes(latest);
            }
        }
    }, [sceneActionsAndOutcomes]);
    return (
        <section>
            {!scene || !!sceneActionsAndOutcomes.length
                ? null
                : scene.setup.map((text) => <p key={text}>{text}</p>)}
            {latestSceneActionsAndOutcomes.map(({ action, outcome }) => (
                <ActionNarration
                    key={action.id}
                    action={action}
                    outcome={outcome}
                />
            ))}
        </section>
    );
};

export default Narration;
