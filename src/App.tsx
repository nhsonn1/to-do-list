import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AddTaskPage from './components/AddTaskPage';
import UpdateTaskPage from './components/UpdateTaskPage';

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/todo-list' />} />
            <Route path='/todo-list' element={<TodoList />} />
            <Route path='/todo-list/create' element={<AddTaskPage />} />
            <Route path='/todo-list/update/:taskId' element={<UpdateTaskPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
