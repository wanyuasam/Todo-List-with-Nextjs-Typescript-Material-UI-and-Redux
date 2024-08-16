import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/db.json';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data.todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const newTodo = { title, complete: false };
  return newTodo;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id: number) => {
  return id;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  return id;
});

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) todo.complete = !todo.complete;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  }
});

export default todoSlice.reducer;
