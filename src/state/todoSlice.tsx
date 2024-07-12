import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete){
            return state.filter(todo => todo.id !== action.payload);
            }
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

export const { addTask, deleteTask, toggleTaskCompletion, updateTask } = todoSlice.actions;
export default todoSlice.reducer;