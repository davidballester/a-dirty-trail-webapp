import React, { ReactElement } from 'react';
import { css } from 'emotion';
import { animated, Transition } from 'react-spring';

const CombatSelectionCategoryTransition = ({
    visible,
    items,
    children,
}: {
    visible: boolean | undefined;
    items: any[];
    children: (item: any) => ReactElement;
}): ReactElement => (
    <Transition
        items={visible || undefined}
        from={{
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)',
        }}
        enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
    >
        {(style) => (
            <animated.div style={style}>
                <div
                    className={css`
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                    `}
                >
                    <SelectionItemsTransition items={items}>
                        {children}
                    </SelectionItemsTransition>
                </div>
            </animated.div>
        )}
    </Transition>
);

export default CombatSelectionCategoryTransition;

const SelectionItemsTransition = ({
    items,
    children,
}: {
    items: any[];
    children: (item: any) => ReactElement;
}): ReactElement => (
    <Transition
        items={items}
        from={{
            opacity: 0,
            transform: 'translate3d(0, 40px, 0)',
        }}
        enter={{
            opacity: 1,
            transform: 'translate3d(0, 0px, 0)',
        }}
    >
        {(style, item) => (
            <animated.div
                style={style}
                className={css`
                    flex: 0 0 33.333333%;
                    max-width: 33.333333%;
                    padding: 0.5rem;
                `}
            >
                {children(item)}
            </animated.div>
        )}
    </Transition>
);
