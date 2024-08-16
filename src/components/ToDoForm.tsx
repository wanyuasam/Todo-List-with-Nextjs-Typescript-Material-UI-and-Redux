"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { Box, TextField, Button } from '@mui/material';
import { AppDispatch } from '../store/index';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        variant="outlined"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
};

export default TodoForm;
