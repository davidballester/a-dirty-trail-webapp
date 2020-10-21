import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { useOponentsActions, useScene } from '../contexts/gameContext';
import {
    NonPlayableActor,
    Health as GameHealth,
    Action,
    AttackAction,
    ReloadAction,
} from 'a-dirty-trail';
import Health from './Health';
import { animated, Spring } from 'react-spring';
import useIsNextOponent from '../hooks/useIsNextOponent';
import { useOponentIcon } from '../contexts/oponentIconsContext';

const Oponents = () => {
    const scene = useScene();
    if (!scene) {
        return null;
    }
    const oponents = scene.getHostileActors();
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
                    <li key={oponent.id}>
                        <Oponent oponent={oponent} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Oponents;

const Oponent = ({ oponent }: { oponent: NonPlayableActor }) => {
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

const OponentCard = ({ oponent }: { oponent: NonPlayableActor }) => (
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
        <OponentName name={oponent.name} />
        <OponentHealth health={oponent.health} />
        <div
            className={css`
                margin-top: 1rem;
            `}
        >
            <OponentNextAction oponent={oponent} />
        </div>
    </article>
);

const OponentPortrait = ({ oponent }: { oponent: NonPlayableActor }) => {
    const oponentPortraitSrc = useOponentIcon(oponent.name);
    return (
        <img
            src={oponentPortraitSrc}
            alt={oponent.name}
            className={css`
                width: 5rem;
            `}
        />
    );
};

const OponentName = ({ name }: { name: string }) => (
    <h3
        className={
            'text-capitalize ' +
            css`
                font-size: 2rem;
            `
        }
    >
        {name}
    </h3>
);

const OponentHealth = ({ health }: { health: GameHealth }) => (
    <Health
        health={health}
        iconClassName={css`
            height: 2rem;
        `}
    />
);

const OponentNextAction = ({ oponent }: { oponent: NonPlayableActor }) => {
    const oponentsActions = useOponentsActions();
    const nextAction = oponentsActions.find(
        ({ player }) => player.id === oponent.id
    );
    if (!nextAction) {
        return null;
    }
    return <OponentNextActionContent nextAction={nextAction} />;
};

const OponentNextActionContent = ({ nextAction }: { nextAction: Action }) => {
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
}) => {
    const weapon = nextAction.weapon;
    return (
        <img
            src={`${weapon.name}-outlined.svg`}
            alt={weapon.name}
            title={`The oponent will attack with their ${weapon.name}`}
            className={css`
                height: 3rem;
            `}
        />
    );
};

const OponentNextReloadActionContent = ({
    nextAction,
}: {
    nextAction: ReloadAction;
}) => {
    const weapon = nextAction.weapon;
    const ammunition = nextAction.ammunition;
    return (
        <div
            className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                > img {
                    height: 3rem;
                }
                > img:last-child {
                    margin-left: 0.5rem;
                }
            `}
        >
            <img
                src={`${ammunition.name}-outlined-empty.svg`}
                alt={ammunition.name}
            />
            {'➜'}
            <img src={`${weapon.name}-outlined.svg`} alt={weapon.name} />
        </div>
    );
};

const OponentNextScapeActionContent = () => <strong>Scape!</strong>;
