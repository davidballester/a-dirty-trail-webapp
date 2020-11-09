import React, { ReactElement } from 'react';
import FooterButtonAndModalContent from './FooterButtonAndModalContent';
import IconsAttribution from './IconsAttribution';

const AboutButton = (): ReactElement => (
    <FooterButtonAndModalContent title="About">
        <p>
            A dirty trail is a minimalistic narrative-first game with actual
            mechanics.
        </p>
        <p>It was made by me, David Ballester Mena.</p>
        <IconsAttribution />
        <p>&copy; {new Date().getFullYear()}</p>
    </FooterButtonAndModalContent>
);

export default AboutButton;
