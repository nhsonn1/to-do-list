import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTaskAsync } from "../state/todoSlice";
import { nanoid } from "nanoid";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import { RootState, AppDispatch } from "../state/store";
const AddTaskPage = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(addTaskAsync({ name, completed: false }));
            setName('');
            navigate('/todo-list');
        }
    };

    return (
        <Container style={{ marginTop: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <Card style={{ width: '555px', }}>
                <CardBody>
                    <Card.Title>Add New Tasks</Card.Title>
                    <br></br>
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
                    <br></br>
                    <Button variant="primary" type='submit' onClick={handleAddTask}>Add Task</Button>
                </CardBody>
            </Card>
        </Container>
    );

}
export default AddTaskPage;