"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTodos } from '../store/todoSlice';
import TodoItem from './ToDoItem';
import { List, Box } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Box>
      <List>
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} title={todo.title} complete={todo.complete} />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
