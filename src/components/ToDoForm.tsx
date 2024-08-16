"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { AppDispatch } from '../store/index';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low'); // Default value for priority

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title, description, priority }));
      setTitle('');
      setDescription('');
      setPriority('Low');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        variant="outlined"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="Priority"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
};

export default TodoForm;
