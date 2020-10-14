import React, { Fragment } from 'react';
import { css } from 'emotion';
import {
    Actor,
    Ammunition as GameAmmunition,
    Weapon as GameWeapon,
    Item,
} from 'a-dirty-trail';
import { useGame } from '../contexts/gameContext';
import Health from './Health';
import IconAndText from './IconAndText';
import Weapon from './Weapon';
import SkillName from './SkillName';
import { SkillLevelBadge, SkillLevelText } from './SkillLevel';
import Ammunition from './Ammunition';
import { Col, Container, Row } from 'react-bootstrap';
import SideArticle from './SideArticle';

const PlayerData = ({ player }: { player: Actor }) => (
    <SideArticle even={false}>
        <IconAndText
            iconSrc="/player.svg"
            iconAlt="player icon"
            iconSize="large"
            textSize="large"
        >
            <strong>{player.name}</strong>
            <Health health={player.health} />
        </IconAndText>
    </SideArticle>
);

const Skills = ({ player }: { player: Actor }) => (
    <SideArticle even={true}>
        <header>
            <h3>Skills</h3>
        </header>
        <dl>
            {player.skills.map((skill) => (
                <Fragment key={skill.name}>
                    <dt>
                        <SkillName skillName={skill.name} />
                    </dt>
                    <dd>
                        <SkillLevelBadge
                            id={`skill-${player.id}-${skill.name}`}
                            skillLevel={skill.level}
                        />
                    </dd>
                </Fragment>
            ))}
        </dl>
    </SideArticle>
);

const Weapons = ({ player }: { player: Actor }) => (
    <SideArticle even={false}>
        <header>
            <h3>Weapons</h3>
        </header>
        <ul className="list-unstyled">
            {player.inventory.getWeapons().map((weapon) => (
                <li
                    key={weapon.id}
                    className={css`
                        margin-bottom: 0.5rem;
                    `}
                >
                    <Weapon
                        weapon={weapon}
                        skillLevel={player.getSkill(weapon.skillName).level}
                    />
                </li>
            ))}
        </ul>
    </SideArticle>
);

const AmmunitionsList = ({
    ammunitions,
}: {
    ammunitions: GameAmmunition[];
}) => (
    <ul className="list-unstyled">
        {ammunitions.map((ammunition) => (
            <li
                key={ammunition.id}
                className={css`
                    margin-bottom: 0.5rem;
                `}
            >
                <Ammunition ammunition={ammunition as GameAmmunition} />
            </li>
        ))}
    </ul>
);

const Ammunitions = ({ player }: { player: Actor }) => (
    <SideArticle even={true}>
        <header>
            <h3>Ammunitions</h3>
        </header>
        <Container>
            <Row>
                <Col
                    className={css`
                        padding-left: 0;
                    `}
                >
                    <AmmunitionsList
                        ammunitions={
                            player.inventory.items
                                .filter(
                                    (item) => item instanceof GameAmmunition
                                )
                                .filter(
                                    (_, index) => index % 2 === 0
                                ) as GameAmmunition[]
                        }
                    />
                </Col>
                <Col
                    className={css`
                        padding-right: 0;
                    `}
                >
                    <AmmunitionsList
                        ammunitions={
                            player.inventory.items
                                .filter(
                                    (item) => item instanceof GameAmmunition
                                )
                                .filter(
                                    (_, index) => index % 2 === 1
                                ) as GameAmmunition[]
                        }
                    />
                </Col>
            </Row>
        </Container>
    </SideArticle>
);

const Inventory = ({ items }: { items: Item[] }) => (
    <SideArticle even={false}>
        <header>
            <h3>Inventory</h3>
        </header>
        <ul className="list-unstyled">
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    </SideArticle>
);

const Player = () => {
    const game = useGame();
    if (!game) {
        return null;
    }
    const player = game.player;
    const regularItems = player.inventory.items.filter(
        (item) =>
            !(item instanceof GameWeapon) && !(item instanceof GameAmmunition)
    );
    return (
        <div>
            <PlayerData player={player} />
            <Skills player={player} />
            <Weapons player={player} />
            <Ammunitions player={player} />
            {!regularItems.length ? null : <Inventory items={regularItems} />}
        </div>
    );
};

export default Player;
