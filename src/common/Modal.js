import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = (props) => {
    return(
        <Modal {...props} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                {props.title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
            {props.title === "Edit tweet" ? 
            <Button variant="primary" onClick={() => {
                props.handleEditTweet();
                props.handleClose();
                props.update();
                }}>
                Save changes
            </Button> : ''
            }
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;