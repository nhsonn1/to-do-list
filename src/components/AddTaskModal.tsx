import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../state/todoSlice";
import { nanoid } from "nanoid";
import { Button, Form, Modal } from "react-bootstrap";

const AddTaskModal = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleAddTask = () => {
        dispatch(addTask({ id: nanoid(), name, completed: false }));
        setName('');
        setShowModal(false);
    };

    return (
        <div>
            <Button variant="success" onClick={() => setShowModal(true)}>Add Task</Button>
            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddTask}>
                            <Form.Group controlId="newTask">
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter new task"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
export default AddTaskModal;