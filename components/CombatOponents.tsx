import React, { ReactElement } from 'react';
import { css } from 'emotion';
import Health from './Health';
import { animated, Spring } from 'react-spring';
import { useOponentIcon } from '../contexts/oponentIconsContext';
import {
    useCombatSceneEngine,
    useScene,
} from '../contexts/combatSceneEngineContext';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import GameHealth from 'a-dirty-trail/build/core/Health';
import Action from 'a-dirty-trail/build/actions/Action';
import AttackAction from 'a-dirty-trail/build/actions/AttackAction';
import ReloadAction from 'a-dirty-trail/build/actions/ReloadAction';

const Oponents = (): ReactElement => {
    const scene = useScene();
    if (!scene) {
        return null;
    }
    const oponents = scene.getAliveActors();
    if (!oponents.length) {
        return <NoOponents />;
    }
    return (
        <section>
            <ul
                className={
                    'list-unstyled ' +
                    css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        > li {
                            margin-right: 1rem;
                        }
                    `
                }
            >
                {oponents.map((oponent) => (
                    <li key={oponent.getId()}>
                        <Oponent oponent={oponent} />
                    </li>
                ))}
            </ul>
        </section>
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
                    `}
                />
            </animated.div>
        )}
    </Spring>
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
        <OponentPortrait oponent={oponent} />
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

const OponentPortrait = ({
    oponent,
}: {
    oponent: NonPlayableActor;
}): ReactElement => {
    const oponentPortraitSrc = useOponentIcon(oponent.getName());
    return (
        <img
            src={oponentPortraitSrc}
            alt={oponent.getName()}
            className={css`
                width: 4rem;
                @media (min-width: 900px) {
                    width: 5rem;
                }
            `}
        />
    );
};

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
