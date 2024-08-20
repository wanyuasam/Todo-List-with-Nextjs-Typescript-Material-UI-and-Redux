import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/todos';

type Todo = {
  id: number;
  title: string;
  description: string;
  priority: string;
  complete: boolean;
};

interface TodoState {
  todos: Todo[];
  status: 'idle';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// get all todo items
export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get(API_URL);
    console.log('Fetched todos:', response.data.todos);
    return response.data;
  }
);

// post a new task
export const addTodo = createAsyncThunk<Todo, { title: string; description: string; priority: string }>(
  'todos/addTodo',
  async ({ title, description, priority }) => {
    const newTodo: Omit<Todo, 'id'> = { title, description, priority, complete: false };
    const response = await axios.post(API_URL, newTodo);
    return response.data;
  }
);


export const toggleTodo = createAsyncThunk<number, number>(
  'todos/toggleTodo',
  async (id) => {
    const response = await axios.patch(`http://localhost:3001/todos/${id}`, { complete: true });
    return id;
  }
);


export const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (id) => {
    return id;
  }
);

export const updateTodo = createAsyncThunk<Todo, Todo>(
  'todos/updateTodo',
  async (todo) => {
    const response = await axios.put(`http://localhost:3001/todos/${todo.id}`, todo);
    return response.data;
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
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;
