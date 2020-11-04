import React, { ReactElement, useState } from 'react';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import { useOponentIcon } from '../contexts/oponentIconsContext';

const OponentIcon = ({
    oponent,
    className = '',
}: {
    oponent: NonPlayableActor;
    className?: string;
}): ReactElement => {
    const oponentIcon = useOponentIcon(oponent.getName());
    const [src, setSrc] = useState(`${oponent.getName()}.svg`);
    return (
        <img
            src={src}
            alt={oponent.getName()}
            className={className}
            onError={() => setSrc(oponentIcon)}
        />
    );
};

export default OponentIcon;
