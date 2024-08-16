import { Checkbox, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todoSlice'; 

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  complete: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, priority, complete }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} p={2} border="1px solid lightgray" borderRadius={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Checkbox checked={complete} onChange={handleToggle} />
        <Typography variant="h6" sx={{ textDecoration: complete ? 'line-through' : 'none' }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: 'gray', textDecoration: complete ? 'line-through' : 'none' }}>
        {description}
      </Typography>
      <Typography variant="caption" sx={{ color: 'blue' }}>
        Priority: {priority}
      </Typography>
      <IconButton onClick={handleDelete} sx={{ alignSelf: 'flex-end' }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
