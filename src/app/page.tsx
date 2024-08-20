"use client";

// import TodoForm from '../components/ToDoForm';
import TodoList from '../components/ToDoList';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container sx={{ padding: 4 }} maxWidth="md">
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Todo App
      </Typography>
      {/* <TodoForm /> */}
      <TodoList />
    </Container>
  );
}
