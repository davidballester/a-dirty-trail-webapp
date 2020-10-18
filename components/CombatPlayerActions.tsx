import React from 'react';
import { css } from 'emotion';
import {
    usePlayerActions,
    useExecutePlayerAction,
} from '../contexts/gameContext';
import {
    Action,
    Actor,
    AdvanceToActAction,
    AdvanceToSceneAction,
    AttackAction,
    LootAction,
    NonPlayableActor,
    ReloadAction,
    Weapon,
} from 'a-dirty-trail';
import { Button, Col, Container, Row } from 'react-bootstrap';
import useOponentPortraitSrc from '../hooks/useOponentPortraitSrc';
import useIsNextOponent from '../hooks/useIsNextOponent';
import WeaponAmmunition from './WeaponAmmunition';
import { animated, Transition } from 'react-spring';
import { useToggleGameViewMode } from '../contexts/gameViewModeContext';

const CombatPlayerActions = ({ enabled }: { enabled: boolean }) => (
    <section>
        <Container fluid>
            <Row>
                <PlayerActionsCards enabled={enabled} />
            </Row>
        </Container>
    </section>
);

export default CombatPlayerActions;

const PlayerActionsCards = ({ enabled }: { enabled: boolean }) => {
    const playerActions = usePlayerActions();
    return (
        <Transition
            items={playerActions}
            keys={(playerAction) => getActionKey(playerAction)}
            from={{
                height: '0px',
                opacity: 0,
            }}
            enter={{
                height: '125px',
                opacity: 1,
            }}
            leave={{ height: '0px', opacity: 0 }}
        >
            {(style, playerAction) => (
                <Col
                    xs={12}
                    sm={6}
                    className={css`
                        margin-bottom: 1rem;
                    `}
                >
                    <animated.div style={style}>
                        <PlayerAction enabled={enabled} action={playerAction} />
                    </animated.div>
                </Col>
            )}
        </Transition>
    );
};

const getActionKey = (action: Action) => {
    if (action instanceof AttackAction) {
        return getAttackActionKey(action);
    }
    if (action instanceof ReloadAction) {
        return getReloadActionKey(action);
    }
    if (action instanceof LootAction) {
        return getLootActionKey(action);
    }
    return action.id;
};

const getAttackActionKey = (action: AttackAction) =>
    `${action.weapon.name}-${action.oponent.name}`;

const getReloadActionKey = (action: ReloadAction) => action.weapon.name;

const getLootActionKey = (action: LootAction) => action.inventory.name;

const PlayerAction = ({
    enabled,
    action,
}: {
    enabled: boolean;
    action: Action;
}) => {
    const executePlayerAction = useExecutePlayerAction();
    const toggleGameViewMode = useToggleGameViewMode();
    let onClick = () => executePlayerAction(action);
    let button;
    if (action instanceof AttackAction) {
        button = {
            content: <PlayerAttackAction action={action} />,
            title: `Attack ${action.oponent.name} with ${action.weapon.name}`,
        };
    } else if (action instanceof ReloadAction) {
        button = {
            content: <PlayerReloadAction action={action} />,
            title: `Reload ${action.weapon.name}`,
        };
    } else if (action instanceof LootAction) {
        button = {
            content: <PlayerLootAction action={action} />,
            title: `Loot ${action.inventory.name}`,
        };
    } else if (
        action instanceof AdvanceToActAction ||
        action instanceof AdvanceToSceneAction
    ) {
        button = {
            content: <PlayerAdvanceAction action={action} />,
            title: action.getName(),
        };
        onClick = () => {
            executePlayerAction(action);
            toggleGameViewMode();
        };
    } else {
        return null;
    }
    return (
        <Button
            disabled={!enabled}
            block
            variant="light"
            title={button.title}
            onClick={onClick}
            className={css`
                height: 125px;
                border-color: var(--dark);
                :hover,
                :active,
                :focus {
                    border-color: var(--dark) !important;
                }
            `}
        >
            {button.content}
        </Button>
    );
};

const PlayerAttackAction = ({
    action: { weapon, oponent, player },
}: {
    action: AttackAction;
}) => (
    <>
        <div
            className={css`
                display: flex;
                align-items: center;
                justify-content: left;
            `}
        >
            <PlayerAttackActionWeapon weapon={weapon} />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <PlayerAttackActionProbability
                    player={player}
                    weapon={weapon}
                />
            </div>
            <PlayerAttackActionOponent oponent={oponent} />
        </div>
    </>
);

const PlayerAttackActionWeapon = ({ weapon }: { weapon: Weapon }) => (
    <div>
        <img
            src={`${weapon.name}-outlined.svg`}
            alt={weapon.name}
            className={css`
                height: 3rem;
            `}
        />
        {weapon.ammunition && (
            <WeaponAmmunition ammunition={weapon.ammunition} />
        )}
        <div>
            <small>
                <strong>Damage: </strong>
                {`${weapon.minDamage}-${weapon.maxDamage}`}
            </small>
        </div>
    </div>
);

const PlayerAttackActionProbability = ({
    player,
    weapon,
}: {
    player: Actor;
    weapon: Weapon;
}) => {
    const skillLevel = player.getSkill(weapon.skillName).level;
    const skillLevelChance = `${skillLevel * 100}%`;
    return (
        <figure
            className={css`
                margin-bottom: 0;
                > img {
                    height: 2rem;
                }
            `}
        >
            <img src="chance.svg" alt="Probability of success"></img>
            <figcaption>
                <strong>{skillLevelChance}</strong>
            </figcaption>
        </figure>
    );
};

const PlayerAttackActionOponent = ({ oponent }: { oponent: Actor }) => {
    const oponentPortraitSrc = useOponentPortraitSrc(oponent.name);
    const isNextOponent = useIsNextOponent(oponent as NonPlayableActor);
    return (
        <div>
            <figure
                className={css`
                    margin-bottom: 0.25rem;
                    > img {
                        height: 3rem;
                    }
                `}
            >
                <img src={oponentPortraitSrc} alt={oponent.name} />
                <figcaption className="text-capitalize">
                    <strong>{oponent.name}</strong>
                </figcaption>
            </figure>
            {isNextOponent && <small>Next to act</small>}
        </div>
    );
};

const PlayerReloadAction = ({
    action: { weapon, ammunition },
}: {
    action: ReloadAction;
}) => (
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

const PlayerLootAction = ({
    action: { inventory },
}: {
    action: LootAction;
}) => {
    const oponentPortraitSrc = useOponentPortraitSrc(inventory.name);
    return (
        <div
            className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                > img {
                    height: 3rem;
                }
                > img:first-child {
                    margin-right: 0.5rem;
                }
                > img:last-child {
                    margin-left: 0.5rem;
                }
            `}
        >
            <img src={oponentPortraitSrc} alt={inventory.name} />
            {'➜'}
            <img src="loot.svg" alt="loot" />
        </div>
    );
};

const PlayerAdvanceAction = ({
    action,
}: {
    action: AdvanceToActAction | AdvanceToSceneAction;
}) => <span>{action.getName()}</span>;
