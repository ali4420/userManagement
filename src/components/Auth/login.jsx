// src/components/Auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Form = styled.form`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleLink = styled.p`
  margin-top: 15px;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }
    dispatch(login({ username, password }));
  };

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <FormContainer>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        <ToggleLink>
          Don't have an account? <Link to="/signup">Sign Up here</Link>
        </ToggleLink>
      </Form>
    </FormContainer>
  );
};

export default Login;
