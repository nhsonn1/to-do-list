import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { updateTask } from "../state/todoSlice";

interface UpdateTaskProps {
    taskId: string;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ taskId }) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleUpdateTask = () => {
        if (taskId.trim() && name.trim()) {
            dispatch(updateTask({ id: taskId, name }));
            setName('');
            setShowModal(false);
        }
    };

    return (
        <div>
            <Button variant="danger" onClick={() => setShowModal(true)}>Update Task</Button>
            {showModal && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button variant="primary" onClick={handleUpdateTask}>Update Task</Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </div>
    )
}

export default UpdateTask;