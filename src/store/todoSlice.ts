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

export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.todos;
  }
);

export const addTodo = createAsyncThunk<Todo, { title: string; description: string; priority: string }>(
  'todos/addTodo',
  async ({ title, description, priority }) => {
    // Implement your API call or logic to add a new todo here
    const newTodo: Todo = { id: Date.now(), title, description, priority, complete: false };
    return newTodo;
  }
);

export const toggleTodo = createAsyncThunk<number, number>(
  'todos/toggleTodo',
  async (id) => {
    return id;
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (id) => {
    return id;
  }
);

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
  },
});

export default todoSlice.reducer;
