import React, { ReactElement, useState } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';
import Narration from './Narration';
import { Button } from 'react-bootstrap';
import NarrationInventory from './NarrationInventory';
import NarrationPlayer from './NarrationPlayer';
import Header from './Header';
import { usePlayer, useScene } from '../contexts/narrativeSceneEngineContext';
import PlayerDead from './PlayerDead';
import Settings from './Settings';

enum Tab {
    narration = 0,
    player = 1,
    inventory = 2,
    settings = 3,
}

const centered = css`
    position: relative;
    margin: auto;
    max-width: 600px;
    padding: 0 2rem;
`;

const NarrationView = (): ReactElement => {
    const scene = useScene();
    const player = usePlayer();
    const [prevTab, setPrevTab] = useState(undefined as Tab);
    const [currentTab, setCurrentTab] = useState(Tab.narration);
    if (!scene) {
        return null;
    }
    return (
        <section>
            <div className={centered}>
                <Header />
            </div>
            {player.isAlive() && (
                <>
                    <TabsButtons
                        currentTab={currentTab}
                        onClick={(newTab) => {
                            setPrevTab(currentTab);
                            setCurrentTab(newTab);
                        }}
                    />
                    <div
                        className={css`
                            ${centered}
                            @media (max-width: 900px) {
                                padding-top: 4rem;
                            }
                        `}
                    >
                        <TabContentsWithTransition
                            prevTab={prevTab}
                            currentTab={currentTab}
                        />
                    </div>
                </>
            )}
            {!player.isAlive() && <PlayerDead />}
        </section>
    );
};

export default NarrationView;

const TabContentsWithTransition = ({
    currentTab,
    prevTab,
}: {
    currentTab: Tab;
    prevTab: Tab;
}): ReactElement => {
    const isTransitionLeftToRight = currentTab < prevTab;
    return (
        <div
            className={css`
                position: relative;
                > div {
                    will-change: opacity, translate;
                }
            `}
        >
            <Transition
                items={currentTab}
                from={{
                    opacity: 0,
                    transform: `translate3d(${
                        isTransitionLeftToRight ? '-50%' : '100%'
                    },0,0)`,
                }}
                enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
            >
                {(style, item) => (
                    <animated.div style={style}>
                        {item === Tab.narration && <Narration />}
                        {item === Tab.inventory && <NarrationInventory />}
                        {item === Tab.player && <NarrationPlayer />}
                        {item === Tab.settings && <Settings />}
                    </animated.div>
                )}
            </Transition>
        </div>
    );
};

const TabsButtons = ({
    onClick,
    currentTab,
}: {
    onClick: (newTab: Tab) => void;
    currentTab: Tab;
}): ReactElement => (
    <nav
        className={css`
            @media (max-width: 900px) {
                position: fixed;
                width: 100%;
                top: 0;
                background: var(--white);
                z-index: 2;
                box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                    0px 4px 5px 0px rgba(0, 0, 0, 0.14);
            }
        `}
    >
        <div className={centered}>
            <NarrationButton
                onClick={() => onClick(Tab.narration)}
                selected={currentTab === Tab.narration}
            />
            <PlayerButton
                onClick={() => onClick(Tab.player)}
                selected={currentTab === Tab.player}
            />
            <InventoryButton
                onClick={() => onClick(Tab.inventory)}
                selected={currentTab === Tab.inventory}
            />
            <SettingsButton
                onClick={() => onClick(Tab.settings)}
                selected={currentTab === Tab.settings}
            />
        </div>
    </nav>
);

interface ButtonProps {
    onClick: () => void;
    selected: boolean;
}
const NarrationButton = ({ onClick, selected }: ButtonProps): ReactElement => (
    <TabButton
        onClick={onClick}
        iconAlt="narration"
        iconSrc={selected ? 'narration-selected.svg' : 'narration.svg'}
    />
);

const PlayerButton = ({ onClick, selected }: ButtonProps): ReactElement => (
    <TabButton
        onClick={onClick}
        iconAlt="player"
        iconSrc={selected ? 'player-selected.svg' : 'player.svg'}
    />
);

const InventoryButton = ({ onClick, selected }: ButtonProps): ReactElement => (
    <TabButton
        onClick={onClick}
        iconAlt="inventory"
        iconSrc={selected ? 'inventory-selected.svg' : 'inventory.svg'}
    />
);

const SettingsButton = ({ onClick, selected }: ButtonProps): ReactElement => (
    <TabButton
        onClick={onClick}
        iconAlt="settings"
        iconSrc={selected ? 'settings-selected.svg' : 'settings.svg'}
    />
);

const TabButton = ({
    onClick,
    iconSrc,
    iconAlt,
}: {
    onClick: () => void;
    iconSrc: string;
    iconAlt: string;
}): ReactElement => (
    <Button
        variant="link"
        onClick={onClick}
        className={css`
            :focus {
                box-shadow: none;
            }
            border: none;
            padding-left: 0;
            padding-right: 1rem;
        `}
    >
        <img
            src={iconSrc}
            alt={iconAlt}
            className={css`
                max-width: 3rem;
            `}
        />
    </Button>
);
