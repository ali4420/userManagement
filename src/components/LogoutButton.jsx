// src/components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
