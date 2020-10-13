import React from 'react';
import { Ammunition as GameAmmunition } from 'a-dirty-trail';
import IconAndText from './IconAndText';
import useAmmunitionIconName from '../hooks/useAmmunitionIconName';

const Ammunition = ({ ammunition }: { ammunition: GameAmmunition }) => {
    const iconSrc = useAmmunitionIconName(ammunition.name);
    return (
        <article>
            <IconAndText
                iconSrc={`${iconSrc}.svg`}
                iconAlt={ammunition.name}
                iconSize="medium"
                textSize="small"
            >
                <strong>{ammunition.quantity}</strong>
            </IconAndText>
        </article>
    );
};

export default Ammunition;
