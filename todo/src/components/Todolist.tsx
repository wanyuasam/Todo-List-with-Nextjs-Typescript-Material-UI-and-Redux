// "use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, List } from '@mui/material';
import TodoItem from './TodoItem';
import { RootState, AppDispatch } from '../store';
import { setTodos, addTodo, updateTodo, deleteTodo } from '../slices/todoSlice';
import axios from 'axios';

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('/api/todos');
      dispatch(setTodos(response.data));
    }
    fetchTodos();
  }, [dispatch]);

  const handleAddTodo = async (title: string) => {
    const response = await axios.post('/api/todos', { title });
    dispatch(addTodo(response.data));
  };

  const handleUpdateTodo = async (id: string, complete: boolean) => {
    const response = await axios.put(`/api/todos/${id}`, { complete });
    dispatch(updateTodo(response.data));
  };

  const handleDeleteTodo = async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    dispatch(deleteTodo(id));
  };

  return (
    <Box>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onChange={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
