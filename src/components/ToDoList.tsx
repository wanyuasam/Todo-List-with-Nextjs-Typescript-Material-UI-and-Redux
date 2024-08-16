// TodoList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTodos } from '../store/todoSlice';
import TodoItem from './ToDoItem';
import { List, Box } from '@mui/material';

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos() as any);  
  }, [dispatch]);

  return (
    <Box>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}    
            priority={todo.priority}          
            complete={todo.complete}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
