import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Container, CardBody, Card } from "react-bootstrap";
import { updateTask} from "../state/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../state/store";

const UpdateTaskPage: React.FC = () => {
    const { taskId } = useParams();
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleUpdateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskId && name.trim()) {
            dispatch(updateTask({ id: taskId, name }));
            setName('');
            navigate('/todo-list');
        }
    };

    return (
        <Container style={{ marginTop: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <Card style={{ width: '555px', }}>
                <CardBody>
                    <Card.Title>Update Task</Card.Title>
                    <br></br>
                    <Form onSubmit={handleUpdateTask}>
                        <Form.Group controlId="newTask">
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Updated Task"
                            />
                        </Form.Group>
                    </Form>
                    <br></br>
                    <Button variant="primary" type='submit' onClick={handleUpdateTask}>Update</Button>
                </CardBody>
            </Card>
        </Container>
    );
}

export default UpdateTaskPage;
