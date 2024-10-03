// src/components/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const WelcomeMessage = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return <WelcomeMessage>Welcome, {currentUser.username}!</WelcomeMessage>;
};

export default Dashboard;
