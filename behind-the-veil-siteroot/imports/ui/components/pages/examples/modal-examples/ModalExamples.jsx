/**
 * File Description: Button examples
 * File version: 1.0
 * Contributors: Josh, Nikki
 */

import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from "../../../button/Button";

const ModalExample = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button onClick={onOpenModal}>Open modal</Button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2>Simple centered modal</h2>
            </Modal>
        </div>
    );
};

export default ModalExample;