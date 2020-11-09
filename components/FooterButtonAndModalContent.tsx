import React, { ReactElement, useState } from 'react';
import { css } from 'emotion';
import { Button, Modal } from 'react-bootstrap';

const ModalContent = ({
    title,
    show,
    handleClose,
    children,
}: {
    title: string;
    show: boolean;
    handleClose: () => void;
    children: ReactElement | ReactElement[];
}): ReactElement => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
    </Modal>
);

const FooterButtonAndModalContent = ({
    title,
    children,
}: {
    title: string;
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button
                variant="link"
                onClick={() => setShow(true)}
                className={css`
                    color: var(--dark);
                    :hover,
                    :active,
                    :visited,
                    :focus {
                        color: var(--dark);
                    }
                `}
            >
                {title}
            </Button>
            <ModalContent
                title={title}
                show={show}
                handleClose={() => setShow(false)}
            >
                {children}
            </ModalContent>
        </>
    );
};

export default FooterButtonAndModalContent;
