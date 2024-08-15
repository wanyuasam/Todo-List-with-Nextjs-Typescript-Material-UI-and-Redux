import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewTodo = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      await axios.post('/api/todos', { title });
      router.push('/');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">Create</Button>
    </Box>
  );
};

export default NewTodo;
