import React, { ReactElement } from 'react';
import FooterButtonAndModalContent from './FooterButtonAndModalContent';

const CookiesButton = (): ReactElement => (
    <FooterButtonAndModalContent title="Cookies">
        <p>
            A dirty trail uses only the cookies it needs to function, and
            therefore they cannot be switched off. These cookies do not store
            personal information of any kind.
        </p>
    </FooterButtonAndModalContent>
);

export default CookiesButton;
