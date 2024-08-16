import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/db.json';

type Todo = {
  id: number;
  title: string;
  description: string;  
  priority: string;     
  complete: boolean;
};

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data.todos as Todo[];
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodoData: { title: string; description: string; priority: string }) => {
  const { title, description, priority } = newTodoData;
  const newTodo: Todo = { 
    id: Date.now(), 
    title, 
    description,   
    priority,      
    complete: false 
  };
  return newTodo;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id: number) => {
  return id;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) todo.complete = !todo.complete;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  }
});

export default todoSlice.reducer;
