import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';
import { usePlayerActions, useScene } from '../contexts/gameContext';
import NarrationPlayerActions from './NarrationPlayerActions';

const Narration = (): ReactElement => {
    const scene = useScene();
    const playerActions = usePlayerActions();
    if (!scene || !playerActions) {
        return null;
    }
    return (
        <article>
            <NarrationTitle title={scene.name} />
            <SceneSetup sceneSetup={scene.setup} />
            <NarrationPlayerActions />
        </article>
    );
};

const NarrationTitle = ({ title }: { title: string }): ReactElement => (
    <h2>{title}</h2>
);

const SceneSetup = ({ sceneSetup }: { sceneSetup: string[] }): ReactElement => {
    return (
        <section
            className={css`
                > p {
                    will-change: opacity, translate;
                }
            `}
        >
            <Transition
                items={sceneSetup}
                from={{
                    opacity: 0,
                    transform: 'translate3d(0, 40px, 0)',
                }}
                enter={{
                    opacity: 1,
                    transform: 'translate3d(0, 0px, 0)',
                }}
            >
                {(style, item) => (
                    <animated.p style={style as any}>{item}</animated.p>
                )}
            </Transition>
        </section>
    );
};

export default Narration;
