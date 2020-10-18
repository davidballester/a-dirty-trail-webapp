import React from 'react';
import { css } from 'emotion';
import {
    usePlayer,
    usePlayerActions,
    useSelectPlayerAction,
} from '../contexts/gameContext';
import {
    Action,
    Actor,
    AttackAction,
    NonPlayableActor,
    Weapon,
} from 'a-dirty-trail';
import { Button, Col, Container, Row } from 'react-bootstrap';
import useOponentPortraitSrc from '../hooks/useOponentPortraitSrc';
import useIsNextOponent from '../hooks/useIsNextOponent';
import WeaponAmmunition from './WeaponAmmunition';

const CombatPlayerActions = () => {
    const player = usePlayer();
    const playerActions = usePlayerActions();
    return (
        <section>
            <header>
                <h2 className="text-center">Actions</h2>
            </header>
            <Container fluid>
                <Row>
                    {playerActions.map((playerAction) => (
                        <Col
                            key={playerAction.id}
                            xs={12}
                            sm={6}
                            className={css`
                                margin-bottom: 1rem;
                                > * {
                                    height: 100%;
                                }
                            `}
                        >
                            <PlayerAction
                                player={player}
                                action={playerAction}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CombatPlayerActions;

const PlayerAction = ({
    action,
    player,
}: {
    action: Action;
    player: Actor;
}) => {
    const selectPlayerAction = useSelectPlayerAction();
    const onClick = () => selectPlayerAction(action);
    if (action instanceof AttackAction) {
        return (
            <PlayerAttackAction
                action={action}
                player={player}
                onClick={onClick}
            />
        );
    }
    return null;
};

const PlayerAttackAction = ({
    action: { weapon, oponent },
    player,
    onClick,
}: {
    action: AttackAction;
    player: Actor;
    onClick: () => void;
}) => (
    <Button
        block
        variant="light"
        title={`Attack ${oponent.name} with ${weapon.name}`}
        onClick={onClick}
        className={css`
            border-color: var(--dark);
            :hover,
            :active,
            :focus {
                border-color: var(--dark) !important;
            }
        `}
    >
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
    </Button>
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
    const oponentPortraitSrc = useOponentPortraitSrc(oponent.id);
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
