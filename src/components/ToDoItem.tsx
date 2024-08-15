"use client";

import { Checkbox, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todoSlice';

interface TodoItemProps {
  id: number;
  title: string;
  complete: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, complete }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Checkbox checked={complete} onChange={handleToggle} />
      <Typography sx={{ textDecoration: complete ? 'line-through' : 'none' }}>
        {title}
      </Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
