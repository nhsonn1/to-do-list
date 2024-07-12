import React, { useState } from "react";
import { Table, Button, Card, Container } from 'react-bootstrap';
import TasksMessage from "./Message";
import UpdateTask from "./UpdateTask";
import AddTaskModal from "./AddTaskModal";
import { deleteTask, toggleTaskCompletion } from "../state/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    const handleToggleCompletion = (taskId: string) => {
        dispatch(toggleTaskCompletion(taskId));
    };

    const handleDeleteTask = (taskId: string) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <Container>
            <h2 style={{ marginTop: '15px'}}>
                To-do List
            </h2>
            <div style={{ marginTop: '25px', marginBottom: '35px'}}>
            <AddTaskModal />
            </div>
            {todos.length === 0 ? (
                <Card className="mt-4">
                    <Card.Body>
                        <TasksMessage>
                            There are no tasks at the moment! Please add a new task.
                        </TasksMessage>
                    </Card.Body>
                </Card>
            ) : (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: '7%' }}>No.</th>
                            <th style={{ width: '38%' }}>Task Name</th>
                            <th style={{ width: '20%' }}>Completed</th>
                            <th style={{ width: '35%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.name}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleCompletion(task.id)}
                                    />
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                        <UpdateTask taskId={task.id} />
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
        </Container>
    );

}

export default TodoList;

