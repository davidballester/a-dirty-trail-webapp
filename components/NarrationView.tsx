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

enum Tab {
    narration = 0,
    player = 1,
    inventory = 2,
}
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
            <Header />
            <CenteredContainer>
                {player.isAlive() && (
                    <>
                        <TabsButtons
                            currentTab={currentTab}
                            onClick={(newTab) => {
                                setPrevTab(currentTab);
                                setCurrentTab(newTab);
                            }}
                        />
                        <TabContentsWithTransition
                            prevTab={prevTab}
                            currentTab={currentTab}
                        />
                    </>
                )}
                {!player.isAlive() && <PlayerDead />}
            </CenteredContainer>
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
                    </animated.div>
                )}
            </Transition>
        </div>
    );
};

const CenteredContainer = ({
    children,
}: {
    children: React.ReactElement | React.ReactElement[];
}): ReactElement => (
    <main
        className={css`
            position: relative;
            margin: auto;
            max-width: 600px;
            padding: 0 2rem;
        `}
    >
        {children}
    </main>
);

const TabsButtons = ({
    onClick,
    currentTab,
}: {
    onClick: (newTab: Tab) => void;
    currentTab: Tab;
}): ReactElement => (
    <nav>
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
