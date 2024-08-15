"use client";

import TodoForm from '../components/ToDoForm';
import TodoList from '../components/ToDoList';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Todo App
      </Typography>
      <TodoForm />
      <TodoList />
    </Box>
  );
}
