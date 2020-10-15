import React from 'react';
import { css } from 'emotion';
import { animated, useTransition } from 'react-spring';
import { usePlayerActions, useScene } from '../contexts/gameContext';
import PlayerActions from './PlayerActions';

const Narration = () => {
    const scene = useScene();
    const playerActions = usePlayerActions();
    if (!scene || !playerActions) {
        return null;
    }
    return (
        <article>
            <NarrationTitle title={scene.name} />
            <SceneSetup sceneSetup={scene.setup} />
            <PlayerActions />
        </article>
    );
};

const NarrationTitle = ({ title }: { title: string }) => <h2>{title}</h2>;

const SceneSetup = ({ sceneSetup }: { sceneSetup: string[] }) => {
    const transition = useTransition(sceneSetup, {
        from: {
            opacity: 0,
            transform: 'translate3d(0, 40px, 0)',
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(0, 0px, 0)',
        },
    });
    return (
        <section
            className={css`
                > p {
                    will-change: opacity, translate;
                }
            `}
        >
            {transition((style, item) => (
                <animated.p style={style as any}>{item}</animated.p>
            ))}
        </section>
    );
};

export default Narration;
