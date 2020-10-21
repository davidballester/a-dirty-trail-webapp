import React, { ReactElement, useState } from 'react';
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
            <IconsAttribution />
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
                className={className}
            >
                About
            </Button>
            <AboutContent show={show} handleClose={() => setShow(false)} />
        </>
    );
};

export default AboutButton;
