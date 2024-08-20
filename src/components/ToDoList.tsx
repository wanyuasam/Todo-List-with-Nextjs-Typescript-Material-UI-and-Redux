// TodoList.tsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchTodos } from '../store/todoSlice';
import TodoItem from './ToDoItem';
import TodoForm from './ToDoForm';
import { List, Box, Typography } from '@mui/material';

interface Todo {
  id: number;
  title: string;
  description: string;
  priority: string;
  complete: boolean;
}

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo); // Set the selected todo for editing
  };

  const clearEditing = () => {
    setEditingTodo(null); // Clear the editing state
  };

  return (
    <Box>
      {/* Only one form is rendered based on the editingTodo state */}
      <TodoForm editingTodo={editingTodo} clearEditing={clearEditing} />
      
      <List>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              priority={todo.priority}
              complete={todo.complete}
              onEdit={() => handleEdit(todo)} // Pass the edit handler
            />
          ))
        ) : (
          <Typography>No todos available</Typography>
        )}
      </List>
    </Box>
  );
};

export default TodoList;
