import React, { ReactElement, useState } from 'react';
import { css } from 'emotion';
import { Button, Modal } from 'react-bootstrap';
import cookie from 'cookie';
import { SAVED_GAME_COOKIE } from '../helpers/constants';

const Settings = (): ReactElement => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    return (
        <>
            <Button onClick={() => setShowSettingsModal(true)} variant="link">
                <img
                    src="settings.svg"
                    alt="Settings"
                    className={css`
                        height: 1.5rem;
                    `}
                />
            </Button>
            <SettingsModal
                show={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
        </>
    );
};

export default Settings;

const SettingsModal = ({
    show,
    onClose,
}: {
    show: boolean;
    onClose: () => void;
}): ReactElement => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ClearSavedGames onDone={onClose} />
        </Modal.Body>
    </Modal>
);

const ClearSavedGames = ({ onDone }: { onDone: () => void }): ReactElement => {
    const clearSavedGames = useClearSavedGames();
    return (
        <p>
            <Button
                variant="outline-dark"
                onClick={() => {
                    clearSavedGames();
                    onDone();
                }}
                block
            >
                Remove saved games
            </Button>
            <small>Watch out! You current progress will be lost.</small>
        </p>
    );
};

const useClearSavedGames = (): (() => void) => {
    return () => {
        const cookies = cookie.parse(document.cookie);
        const savedGameCookie = cookies[SAVED_GAME_COOKIE];
        if (!savedGameCookie) {
            return;
        }
        const deleteSavedGameCookie = cookie.serialize(
            SAVED_GAME_COOKIE,
            savedGameCookie,
            { expires: new Date(0) }
        );
        document.cookie = deleteSavedGameCookie;
    };
};
