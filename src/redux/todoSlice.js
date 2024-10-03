// src/redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // List of todos

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      state.push({ id, text, completed });
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
