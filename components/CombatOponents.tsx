import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { css } from 'emotion';
import Health from './Health';
import { animated, Spring } from 'react-spring';
import {
    useCombatSceneEngine,
    useScene,
} from '../contexts/combatSceneEngineContext';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import GameHealth from 'a-dirty-trail/build/core/Health';
import Action from 'a-dirty-trail/build/actions/Action';
import AttackAction from 'a-dirty-trail/build/actions/AttackAction';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';
import OponentIcon from './OponentIcon';
import { Carousel } from 'react-bootstrap';

const Oponents = (): ReactElement => {
    const firstCarouselPageRef = useRef<HTMLDivElement>();
    const carouselPages = useCarouselPages();
    const [carouselPageHeight, setCarouselPageHeight] = useState<number>(
        undefined
    );
    useEffect(() => {
        if (firstCarouselPageRef.current && !carouselPageHeight) {
            setCarouselPageHeight(firstCarouselPageRef.current.clientHeight);
        }
    }, [firstCarouselPageRef.current, carouselPageHeight]);
    const [carouselPage, onCarouselPageChange] = useCarouselPage();
    const scene = useScene();
    if (!scene) {
        return null;
    }
    const oponents = scene.getAliveActors();
    if (!oponents.length) {
        return <NoOponents />;
    }
    if (carouselPages.length === 1) {
        return <OponentsList oponents={carouselPages[0].oponents} />;
    }
    return (
        <Carousel
            interval={null}
            activeIndex={carouselPage}
            onSelect={onCarouselPageChange}
            className={css`
                margin-bottom: 1rem;
                .carousel-indicators {
                    bottom: -2rem;
                    li {
                        background-color: var(--dark);
                    }
                }
                .carousel-control-next,
                .carousel-control-prev {
                    color: var(--dark);
                    font-size: 3rem;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }
                .carousel-control-prev {
                    left: -1.5rem;
                    justify-content: flex-start;
                }

                .carousel-control-next-icon {
                    background-image: none;
                    &:before {
                        content: '>';
                        display: flex;
                        justify-content: flex-end;
                    }
                }

                .carousel-control-next {
                    right: -1.5rem;
                    justify-content: flex-end;
                }

                .carousel-control-prev-icon {
                    background-image: none;
                    &:before {
                        content: '<';
                        display: flex;
                        justify-content: flex-start;
                    }
                }
            `}
        >
            {carouselPages.map((carouselPage, index) => (
                <Carousel.Item
                    key={carouselPage.id}
                    ref={index === 0 ? firstCarouselPageRef : undefined}
                    className={
                        carouselPageHeight
                            ? css`
                                  min-height: ${carouselPageHeight}px;
                              `
                            : undefined
                    }
                >
                    <OponentsList oponents={carouselPage.oponents} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Oponents;

const NoOponents = (): ReactElement => (
    <Spring
        from={{
            opacity: 0,
            transform: `scale(0.5)`,
        }}
        to={{
            opacity: 1,
            transform: `scale(1)`,
        }}
    >
        {(style) => (
            <animated.div style={style as any} className="text-center">
                <img
                    src="no-oponents.svg"
                    alt="No oponents left"
                    className={css`
                        max-width: 10rem;
                        margin-bottom: 2rem;
                    `}
                />
            </animated.div>
        )}
    </Spring>
);

const useCarouselPages = (): CarouselPage[] => {
    const scene = useScene();
    const oponents = scene.getAliveActors();
    const oponentsPerPage = useOponentsPerPage();
    let pagesCount = Math.floor(oponents.length / oponentsPerPage);
    if (oponents.length % oponentsPerPage > 0) {
        pagesCount++;
    }
    return new Array(pagesCount).fill(null).map((_, index) => {
        const oponentsInPage = oponents.slice(
            index * oponentsPerPage,
            (index + 1) * oponentsPerPage
        );
        return {
            id: oponentsInPage.map((oponent) => oponent.getId()).join(','),
            oponents: oponentsInPage,
        };
    });
};

const useOponentsPerPage = (): number => {
    if (document.body.clientWidth > 600) {
        return 3;
    } else {
        return 2;
    }
};

interface CarouselPage {
    id: string;
    oponents: NonPlayableActor[];
}

const useCarouselPage = (): [number, (newPage: number) => void] => {
    const [currentPage, setCurrentPage] = useState(0);
    const nextOponentPage = useNextOponentPage();
    useEffect(() => {
        setCurrentPage(nextOponentPage);
    }, [nextOponentPage]);
    return [currentPage, setCurrentPage];
};

const useNextOponentPage = (): number => {
    const carouselPages = useCarouselPages();
    const combatSceneEngine = useCombatSceneEngine();
    const actorCurrentTurn = combatSceneEngine.getActorCurrentTurn();
    const actorNextTurn = combatSceneEngine.getActorNextTurn();
    const nextOponent =
        actorCurrentTurn instanceof NonPlayableActor
            ? actorCurrentTurn
            : actorNextTurn;
    const nextOponentPage = carouselPages.findIndex((carouselPage) =>
        carouselPage.oponents.some((oponent) => oponent.equals(nextOponent))
    );
    return nextOponentPage;
};

const OponentsList = ({
    oponents,
}: {
    oponents: NonPlayableActor[];
}): ReactElement => (
    <ul
        className={
            'list-unstyled ' +
            css`
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0;
                padding: 0.25rem;
            `
        }
    >
        {oponents.map((oponent) => (
            <li key={oponent.getId()}>
                <Oponent oponent={oponent} />
            </li>
        ))}
    </ul>
);

const Oponent = ({ oponent }: { oponent: NonPlayableActor }): ReactElement => {
    const isNextOponent = useIsNextOponent(oponent);
    return (
        <Spring
            from={{ transform: `scale(1)` }}
            to={{ transform: `scale(${isNextOponent ? 1 : 0.7})` }}
        >
            {(style) => (
                <animated.div style={style}>
                    <OponentCard oponent={oponent} />
                </animated.div>
            )}
        </Spring>
    );
};

const useIsNextOponent = (oponent: NonPlayableActor): boolean => {
    const combatSceneEngine = useCombatSceneEngine();
    const oponentsInActionOrder = combatSceneEngine.getActorNextTurn();
    return oponentsInActionOrder.equals(oponent);
};

const OponentCard = ({
    oponent,
}: {
    oponent: NonPlayableActor;
}): ReactElement => (
    <article
        className={css`
            width: 10rem;
            padding: 1rem;
            border-radius: 2px;
            box-shadow: 0 0 5px var(--dark);
            display: flex;
            flex-direction: column;
            justify-content: top;
            align-items: center;
        `}
    >
        <OponentIcon
            oponent={oponent}
            className={css`
                width: 4rem;
                min-width: 4rem;
                min-height: 4rem;
                @media (min-width: 900px) {
                    width: 5rem;
                    min-width: 5rem;
                    min-height: 5rem;
                }
            `}
        />
        <OponentName name={oponent.getName()} />
        <OponentHealth health={oponent.getHealth()} />
        <div
            className={css`
                margin-top: 1rem;
            `}
        >
            <OponentNextAction oponent={oponent} />
        </div>
    </article>
);

const OponentName = ({ name }: { name: string }): ReactElement => (
    <h3
        className={
            'text-capitalize ' +
            css`
                font-size: 1.2rem;
                @media (min-width: 900px) {
                    font-size: 2rem !important;
                }
            `
        }
    >
        {name}
    </h3>
);

const OponentHealth = ({ health }: { health: GameHealth }): ReactElement => (
    <Health
        health={health}
        iconClassName={css`
            height: 1.5rem !important;
            @media (min-width: 900px) {
                height: 2rem !important;
            }
        `}
    />
);

const OponentNextAction = ({
    oponent,
}: {
    oponent: NonPlayableActor;
}): ReactElement => {
    const scene = useScene();
    const nextAction = oponent.getNextAction(scene);
    if (!nextAction) {
        return null;
    }
    return <OponentNextActionContent nextAction={nextAction} />;
};

const OponentNextActionContent = ({
    nextAction,
}: {
    nextAction: Action<any>;
}): ReactElement => {
    let nextActionContent: ReactElement;
    if (nextAction instanceof AttackAction) {
        nextActionContent = (
            <OponentNextAttackActionContent nextAction={nextAction} />
        );
    } else if (nextAction instanceof ReloadAction) {
        nextActionContent = (
            <OponentNextReloadActionContent nextAction={nextAction} />
        );
    } else {
        nextActionContent = <OponentNextScapeActionContent />;
    }
    return (
        <section className="text-center">
            <header>
                <h4>Next action</h4>
            </header>
            {nextActionContent}
        </section>
    );
};

const OponentNextAttackActionContent = ({
    nextAction,
}: {
    nextAction: AttackAction;
}): ReactElement => {
    const weapon = nextAction.getWeapon();
    return (
        <img
            src={`${weapon.getType()}.svg`}
            alt={weapon.getName()}
            title={`The oponent will attack with their ${weapon.getName()}`}
            className={css`
                height: 2rem;
                @media (min-width: 900px) {
                    height: 3rem;
                }
            `}
        />
    );
};

const OponentNextReloadActionContent = ({
    nextAction,
}: {
    nextAction: ReloadAction;
}): ReactElement => {
    const weapon = nextAction.getWeapon();
    const ammunitionType = weapon.getAmmunition().getType();
    return (
        <div
            className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                > img {
                    height: 2rem;
                    @media (min-width: 900px) {
                        height: 3rem;
                    }
                }
                > img:last-child {
                    margin-left: 0.5rem;
                }
            `}
        >
            <img src={`${ammunitionType}-empty.svg`} alt={ammunitionType} />
            {'➜'}
            <img src={`${weapon.getType()}.svg`} alt={weapon.getName()} />
        </div>
    );
};

const OponentNextScapeActionContent = (): ReactElement => (
    <strong>Scape!</strong>
);
