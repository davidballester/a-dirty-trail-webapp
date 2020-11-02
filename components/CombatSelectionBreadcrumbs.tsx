import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { Transition, animated } from 'react-spring';
import {
    useActionType,
    useOponent,
    useWeapon,
} from '../contexts/combatActionSelectionContext';
import capitalize from '../helpers/capitalize';

const CombatSelectionBreadcrumb = (): ReactElement => {
    const breadcrumbText = useBreadcrumbText();
    return (
        <div
            className={css`
                position: relative;
                padding-bottom: 2rem;
                > div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}
        >
            <Transition
                items={breadcrumbText}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
            >
                {(style) => (
                    <animated.div style={style as any}>
                        <h6>{breadcrumbText}</h6>
                    </animated.div>
                )}
            </Transition>
        </div>
    );
};

export default CombatSelectionBreadcrumb;

const useBreadcrumbText = () => {
    const actionType = useActionType();
    const attackBreadcrumbText = useAttackBreadcrumbtText();
    const reloadBreadcrumbText = useReloadBreadcrumbtText();
    const lootBreadcrumbText = useLootBreadcrumbtText();
    switch (actionType) {
        case 'attack': {
            return attackBreadcrumbText;
        }
        case 'reload': {
            return reloadBreadcrumbText;
        }
        case 'loot': {
            return lootBreadcrumbText;
        }
    }
};

const useAttackBreadcrumbtText = () => {
    const actionType = useActionType();
    const oponent = useOponent();
    const weapon = useWeapon();
    if (actionType !== 'attack') {
        return null;
    }
    if (!oponent) {
        return 'Select oponent to attack';
    }
    if (!weapon) {
        return `Select weapon to attack ${capitalize(oponent.getName())}`;
    }
    return null;
};

const useReloadBreadcrumbtText = () => {
    const weapon = useWeapon();
    if (!weapon) {
        return 'Select weapon to reload';
    }
    return null;
};

const useLootBreadcrumbtText = () => {
    const oponent = useOponent();
    if (!oponent) {
        return 'Select fallen oponent to loot';
    }
    return null;
};
