// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // List of registered users
  currentUser: null, // Currently logged-in user
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { username, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.username === username);
      if (!existingUser) {
        state.users.push({ username, email, password });
        alert('Sign Up successful! Please log in.');
      } else {
        alert('Username already exists. Please choose a different one.');
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.currentUser = { username: user.username, email: user.email, token: 'fake-token' };
      } else {
        alert('Invalid username or password.');
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateProfile: (state, action) => {
      const { username, email } = action.payload;
      if (state.currentUser) {
        // Update currentUser
        state.currentUser.username = username;
        state.currentUser.email = email;
        // Update the user in the users array
        const userIndex = state.users.findIndex(
          (user) => user.username === state.currentUser.username
        );
        if (userIndex !== -1) {
          state.users[userIndex].username = username;
          state.users[userIndex].email = email;
        }
      }
    },
  },
});

export const { signUp, login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
