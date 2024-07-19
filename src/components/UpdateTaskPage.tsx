import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Container, CardBody, Card } from "react-bootstrap";
import { updateTask} from "../state/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../state/store";
import { updateTaskAsync, fetchTasks } from "../state/todoSlice";

const UpdateTaskPage: React.FC = () => {
    const { taskId } = useParams();
    const [name, setName] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const tasks = useSelector((state: RootState) => state.todos);
    const currentTask = tasks.find(task => task.id === taskId);

    useEffect(() => {
        if (!currentTask) {
            dispatch(fetchTasks());
        } else {
            setName(currentTask.name);
        }
    }, [currentTask, dispatch]);

    const handleUpdateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskId && name.trim()) {
            dispatch(updateTaskAsync(taskId, name));
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
