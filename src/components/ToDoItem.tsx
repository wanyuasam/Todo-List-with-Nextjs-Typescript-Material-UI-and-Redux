import { Checkbox, IconButton, Typography, Box, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../store/todoSlice';
import { useState } from 'react';

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  complete: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, priority, complete }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = () => {
    dispatch(updateTodo({
      id,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      complete
    }));
    setIsEditing(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} p={2} border="1px solid lightgray" borderRadius={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Checkbox checked={complete} onChange={handleToggle} />
        {isEditing ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              variant="outlined"
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" gap={1} marginTop={1}>
              <Button variant="contained" onClick={handleUpdate}>OK</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ textDecoration: complete ? 'line-through' : 'none' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'gray', textDecoration: complete ? 'line-through' : 'none' }}>
              {description}
            </Typography>
            <Typography variant="caption" sx={{ color: 'blue' }}>
              Priority: {priority}
            </Typography>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;
