import React, { ReactElement, useState } from 'react';
import { css } from 'emotion';
import { Button, Modal } from 'react-bootstrap';
import IconsAttribution from './IconsAttribution';

const AboutContent = ({
    show,
    handleClose,
}: {
    show: boolean;
    handleClose: () => void;
}): ReactElement => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                A dirty trail is a minimalistic narrative-first game with actual
                mechanics.
            </p>
            <p>It was made by me, David Ballester Mena.</p>
            <IconsAttribution />
            <p>&copy; {new Date().getFullYear()}</p>
        </Modal.Body>
    </Modal>
);

const AboutButton = ({
    className = '',
}: {
    className?: string;
}): ReactElement => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button
                variant="link"
                onClick={() => setShow(true)}
                className={
                    className +
                    css`
                        color: var(--dark);
                        :hover,
                        :active,
                        :visited,
                        :focus {
                            color: var(--dark);
                        }
                    `
                }
            >
                About
            </Button>
            <AboutContent show={show} handleClose={() => setShow(false)} />
        </>
    );
};

export default AboutButton;
