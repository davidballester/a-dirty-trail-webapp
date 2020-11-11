import React, { ReactElement, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import cookie from 'cookie';
import {
    COOKIES_MAX_AGE_SECONDS,
    DO_NOT_SHOW_SAVE_GAME_NOTICE,
} from '../helpers/constants';

const SaveGameNotice = (): ReactElement => {
    const shouldShowNotice = useShouldShowNotice();
    const doNotShowAgain = useDoNotShowAgain();
    const [show, setShow] = useState(true);
    if (!shouldShowNotice) {
        return null;
    }
    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header>
                <Modal.Title>On saved games</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    The game is <strong>automatically</strong> saved to{' '}
                    <strong>your device</strong> as you progress.
                </p>
                <p>
                    Cleaning the cookies of this site will{' '}
                    <strong>delete</strong> your saved games.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="dark"
                    onClick={() => {
                        doNotShowAgain();
                        setShow(false);
                    }}
                    block
                >
                    Understood
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaveGameNotice;

const useShouldShowNotice = (): boolean => {
    if (!process.browser) {
        return false;
    }
    const cookies = cookie.parse(document.cookie);
    const doNotShowSaveGameNotice = cookies[DO_NOT_SHOW_SAVE_GAME_NOTICE];
    return !doNotShowSaveGameNotice;
};

const useDoNotShowAgain = (): (() => void) => {
    return () => {
        const doNotShowSaveGameNoticeCookie = cookie.serialize(
            DO_NOT_SHOW_SAVE_GAME_NOTICE,
            'true',
            { maxAge: COOKIES_MAX_AGE_SECONDS }
        );
        document.cookie = doNotShowSaveGameNoticeCookie;
    };
};
