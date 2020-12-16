import React, { ReactElement, useState } from 'react';
import { Button } from 'react-bootstrap';
import { animated, Transition } from 'react-spring';
import useClearSavedGames from '../hooks/useClearSavedGames';

const Settings = (): ReactElement => (
    <article>
        <header>
            <h2>Settings</h2>
        </header>
        <ClearSavedGames />
    </article>
);

export default Settings;

const initialText = {
    color: 'secondary',
    text: 'Watch out! You current progress will be lost.',
};
const ClearSavedGames = (): ReactElement => {
    const [enabled, setEnabled] = useState(true);
    const [text, setText] = useState(initialText);
    const clearSavedGames = useClearSavedGames();
    return (
        <p>
            <Button
                variant="outline-dark"
                onClick={() => {
                    clearSavedGames();
                    setText({ color: 'danger', text: 'Saved game deleted!' });
                    setEnabled(false);
                    setTimeout(() => {
                        setText(initialText);
                        setEnabled(true);
                    }, 3000);
                }}
                block
                disabled={!enabled}
            >
                Remove saved games
            </Button>
            <Transition
                items={[text]}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
            >
                {(style, { color, text }) => (
                    <animated.span style={style} className={`text-${color}`}>
                        {text}
                    </animated.span>
                )}
            </Transition>
        </p>
    );
};
