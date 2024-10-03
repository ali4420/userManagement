// src/components/Auth/SignUp.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/userSlice';
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
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #218838;
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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    dispatch(signUp({ username, email, password }));
    // After sign up, redirect to login
    navigate('/');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <ToggleLink>
          Already have an account? <Link to="/">Login here</Link>
        </ToggleLink>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
