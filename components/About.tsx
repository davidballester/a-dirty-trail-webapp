import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import IconsAttribution from './IconsAttribution';

const AboutContent = ({
    show,
    handleClose,
}: {
    show: boolean;
    handleClose: () => void;
}) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <IconsAttribution />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

const AboutButton = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button variant="link" onClick={() => setShow(true)}>
                About
            </Button>
            <AboutContent show={show} handleClose={() => setShow(false)} />
        </>
    );
};

export default AboutButton;
