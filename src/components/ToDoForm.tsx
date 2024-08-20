// TodoForm.tsx
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store';
import { addTodo, updateTodo } from '../store/todoSlice';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface TodoFormProps {
  editingTodo: Todo | null;
  clearEditing: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ editingTodo, clearEditing }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setPriority(editingTodo.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Low');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (editingTodo) {
        dispatch(updateTodo({
          id: editingTodo.id,
          title,
          description,
          priority,
          complete: editingTodo.complete
        }));
      } else {
        dispatch(addTodo({ title, description, priority }));
      }
      setTitle('');
      setDescription('');
      setPriority('Low');
      clearEditing(); // Clear editing state
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        variant="outlined"
        label="Title"
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
      <Button type="submit" variant="contained">
        {editingTodo ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
};

export default TodoForm;
