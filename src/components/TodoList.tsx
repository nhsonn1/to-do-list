import React, { useState, useEffect } from "react";
import { Table, Button, Card, Container } from 'react-bootstrap';
import {TasksMessage, TaskFont} from "./Message";
import UpdateTask from "./UpdateTask";
import AddTaskModal from "./AddTaskModal";
import { deleteTaskAsync, fetchTasks, toggleTaskCompletion } from "../state/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import AddTaskPage from "./AddTaskPage";
import { Link } from 'react-router-dom';
import UpdateTaskPage from "./UpdateTaskPage";

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);
    
    const handleToggleCompletion = async (id: string) => {
        const task = todos.find((task) => task.id === id);
        if (task) {
          await fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...task, completed: !task.completed }),
          });
          dispatch(toggleTaskCompletion(id));
        }
      };

      const handleDeleteTask = async (id: string) => {
        dispatch(deleteTaskAsync(id));
      };

    return (
        
        <Container>
            <h1 style={{textAlign:'center'}}>
                <br></br>
                To-do List
            </h1>
            <div style={{ marginTop: '25px', marginBottom: '35px', textAlign:'center' }}>
                <Button variant="success" as={Link as any} to="/todo-list/create">
                    Add Task
                </Button>
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
                            <th style={{ width: '40%' }}>Task Name</th>
                            <th style={{ width: '20%' }}>Completed</th>
                            <th style={{ width: '33%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <TaskFont completed={task.completed.toString()}>
                                    {task.name}
                                </TaskFont>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleCompletion(task.id)}
                                    />
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '21px' }}>
                                        <Button variant="warning" 
                                        as={Link as any} 
                                        to={`/todo-list/update/${task.id}`}
                                        >
                                            Update
                                        </Button>
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

