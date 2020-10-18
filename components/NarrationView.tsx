import React, { useState } from 'react';
import { css } from 'emotion';
import { animated, useTransition } from 'react-spring';
import Narration from './Narration';
import { Button } from 'react-bootstrap';
import NarrationInventory from './NarrationInventory';
import NarrationPlayer from './NarrationPlayer';
import Header from './Header';

enum Tab {
    narration = 0,
    player = 1,
    inventory = 2,
}
const NarrationView = () => {
    const [prevTab, setPrevTab] = useState(undefined as Tab);
    const [currentTab, setCurrentTab] = useState(Tab.narration);
    const isTransitionLeftToRight = currentTab < prevTab;
    const tabTransition = useTransition(currentTab, {
        from: {
            opacity: 0,
            transform: `translate3d(${
                isTransitionLeftToRight ? '-50%' : '100%'
            },0,0)`,
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(0%,0,0)',
        },
        leave: {
            opacity: 0,
            transform: `translate3d(${
                isTransitionLeftToRight ? '100%' : '-50%'
            },0,0)`,
        },
    });
    return (
        <>
            <Header />
            <CenteredContainer>
                <TabsButtons
                    currentTab={currentTab}
                    onClick={(newTab) => {
                        setPrevTab(currentTab);
                        setCurrentTab(newTab);
                    }}
                />
                <div
                    className={css`
                        position: relative;
                        > div {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            will-change: opacity, translate;
                        }
                    `}
                >
                    {tabTransition((style, item) => (
                        <animated.div style={style as any}>
                            {item === Tab.narration && <Narration />}
                            {item === Tab.inventory && <NarrationInventory />}
                            {item === Tab.player && <NarrationPlayer />}
                        </animated.div>
                    ))}
                </div>
            </CenteredContainer>
        </>
    );
};

export default NarrationView;

const CenteredContainer = ({
    children,
}: {
    children: React.ReactElement | React.ReactElement[];
}) => (
    <main
        className={css`
            position: relative;
            margin: auto;
            max-width: 600px;
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
}) => (
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
const NarrationButton = ({ onClick, selected }: ButtonProps) => (
    <TabButton
        onClick={onClick}
        iconAlt="narration"
        iconSrc={selected ? 'narration-selected.svg' : 'narration.svg'}
    />
);

const PlayerButton = ({ onClick, selected }: ButtonProps) => (
    <TabButton
        onClick={onClick}
        iconAlt="player"
        iconSrc={selected ? 'player-selected.svg' : 'player.svg'}
    />
);

const InventoryButton = ({ onClick, selected }: ButtonProps) => (
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
}) => (
    <Button
        variant="link"
        onClick={onClick}
        className={css`
            :focus {
                box-shadow: none;
            }
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