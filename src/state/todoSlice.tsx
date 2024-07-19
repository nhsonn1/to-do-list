import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { nanoid } from "nanoid";

interface Todo {
    id: string;
    name: string;
    completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Todo[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload);
        },
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            return state.filter(todo => todo.id !== action.payload);        
        },
        updateTask: (state, action: PayloadAction<{id: string; name: string}>) => {
            const {id, name} = action.payload;
            const todo = state.find(todo => todo.id === id);
            if (todo) {
                todo.name = name;
            }
        }
    }
});

export const { setTasks, addTask, deleteTask, toggleTaskCompletion, updateTask } = todoSlice.actions;

export const fetchTasks = (): AppThunk => async dispatch => {
    const response = await fetch('http://localhost:3001/tasks');
    const tasks = await response.json();
    dispatch(setTasks(tasks));
};

export const addTaskAsync = (task: Omit<Todo, 'id'>): AppThunk => async (dispatch, getState) => {
    const previousState = getState().todos;
    const existingTask = previousState.find(t => t.name === task.name);

    if (existingTask) {
        alert("Error adding: Task with this name already exists");
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...task, id: nanoid() }),
        });

        if (response.ok) {
            const newTask = await response.json();
            dispatch(addTask(newTask));
        } else {
            console.error("Failed to add task");
            dispatch(setTasks(previousState));
        }
    } catch (error) {
        console.error("Failed to add task", error);
        dispatch(setTasks(previousState));
    }
};

export const updateTaskAsync = (id: string, name: string): AppThunk => async (dispatch, getState) => {
    try {
        const previousState = getState().todos;
        const existingTask = previousState.find(task => task.name === name && task.id !== id);
        
        if (existingTask) {
            alert("Error updating: Task with this name already exists");
            return;
        }

        const fetchResponse = await fetch(`http://localhost:3001/tasks/${id}`);
        if (!fetchResponse.ok) {
            console.error("Failed to fetch the current task");
            return;
        }

        const currentTask = await fetchResponse.json();
        const updatedTask = {
            ...currentTask,
            name,
        };

        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
            dispatch(updateTask({ id, name }));
        } else {
            console.error("Failed to update task");
            dispatch(setTasks(previousState));
        }
    } catch (error) {
        console.error("Failed to update task", error);
        const previousState = getState().todos;
        dispatch(setTasks(previousState));
    }
};

export const deleteTaskAsync = (id: string): AppThunk => async (dispatch, getState) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        const previousState = getState().todos;

        try {
            const response = await fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                dispatch(deleteTask(id));
            } else {
                console.error("Failed to delete task");
                dispatch(setTasks(previousState));
            }
        } catch (error) {
            console.error("Failed to delete task", error);
            dispatch(setTasks(previousState));
        }
    }
};

export default todoSlice.reducer;