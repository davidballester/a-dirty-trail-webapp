import React from 'react';
import { css } from 'emotion';
import { SkillLevel as GameSkillLevel } from 'a-dirty-trail';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useSkillLevelText from '../hooks/useSkillLevelText';
import useSkillLevelBootstrapVariant from '../hooks/useSkillLevelBootstrapVariant';

interface BaseSkillLevelProps {
    id: string;
    skillLevel: GameSkillLevel;
}

interface SkillLevelProps extends BaseSkillLevelProps {
    children: React.ReactElement;
}

const SkillLevel = ({ id, skillLevel, children }: SkillLevelProps) => (
    <OverlayTrigger
        placement="top"
        overlay={
            <Tooltip id={`tooltip-${id}`}>
                The player has a {skillLevel * 100}% chance of succeeding in a
                roll.
            </Tooltip>
        }
    >
        {children}
    </OverlayTrigger>
);

export const SkillLevelText = ({ id, skillLevel }: BaseSkillLevelProps) => {
    const skillLevelText = useSkillLevelText(skillLevel);
    const skillLevelVariant = useSkillLevelBootstrapVariant(skillLevel);
    return (
        <SkillLevel id={id} skillLevel={skillLevel}>
            <span
                className={
                    `text-${skillLevelVariant} ` +
                    css`
                        cursor: default;
                        font-weight: bold;
                    `
                }
            >
                {skillLevelText}
            </span>
        </SkillLevel>
    );
};

export const SkillLevelBadge = ({ id, skillLevel }: BaseSkillLevelProps) => {
    const skillLevelText = useSkillLevelText(skillLevel);
    const skillLevelVariant = useSkillLevelBootstrapVariant(skillLevel);
    return (
        <SkillLevel id={id} skillLevel={skillLevel}>
            <Badge
                variant={skillLevelVariant}
                className={css`
                    cursor: default;
                `}
            >
                {skillLevelText}
            </Badge>
        </SkillLevel>
    );
};
