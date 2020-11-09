import React, { ReactElement, useState } from 'react';
import { css } from 'emotion';
import { Button, Modal } from 'react-bootstrap';

const CookiesContent = ({
    show,
    handleClose,
}: {
    show: boolean;
    handleClose: () => void;
}): ReactElement => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Cookies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                A dirty trail uses only the cookies it needs to function, and
                therefore they cannot be switched off. These cookies do not
                store personal information of any kind.
            </p>
        </Modal.Body>
    </Modal>
);

const CookiesButton = ({
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
                Cookies
            </Button>
            <CookiesContent show={show} handleClose={() => setShow(false)} />
        </>
    );
};

export default CookiesButton;
