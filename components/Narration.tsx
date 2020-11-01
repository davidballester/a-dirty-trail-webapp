import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';
import NarrationPlayerActions from './NarrationPlayerActions';
import ReactMarkdown from 'react-markdown';
import { useScene } from '../contexts/sceneContext';

const Narration = (): ReactElement => {
    const scene = useScene();
    return (
        <article>
            <SceneTitle title={scene.getTitle()} />
            <SceneSetup sceneSetup={scene.getSetup()} />
            <NarrationPlayerActions />
        </article>
    );
};

const SceneTitle = ({ title }: { title: string }): ReactElement => (
    <h2>{title}</h2>
);

const SceneSetup = ({ sceneSetup }: { sceneSetup: string }): ReactElement => {
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
                {(style, markdownText) => (
                    <animated.div style={style as any}>
                        <ReactMarkdown>{markdownText}</ReactMarkdown>
                    </animated.div>
                )}
            </Transition>
        </section>
    );
};

export default Narration;
