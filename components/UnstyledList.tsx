/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const UnstyledListItem = ({ children, ...props }) => (
    <li
        css={css`
            margin-bottom: 0.5rem;
        `}
        {...props}
    >
        {children}
    </li>
);

export const UnstyledListItemHorizontal = ({ children, ...props }) => (
    <li
        css={css`
            margin-right: 0.5rem;
        `}
        {...props}
    >
        {children}
    </li>
);

const unstyledListBaseCss = css`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const UnstyledList = ({ children, ...props }) => (
    <ul css={[unstyledListBaseCss]} {...props}>
        {children}
    </ul>
);

export const UnstyledListHorizontal = ({ children, ...props }) => (
    <UnstyledList
        css={css`
            display: flex;
        `}
        {...props}
    >
        {children}
    </UnstyledList>
);
