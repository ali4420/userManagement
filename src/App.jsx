// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Todo from './components/Todo';
import Navbar from './components/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <Todo />
              </PrivateRoute>
            }
          />
          {/* Redirect any unknown routes to Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
