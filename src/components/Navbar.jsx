// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #343a40;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 15px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Nav>
      {currentUser && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/todos">Todos</NavLink>
          <LogoutButton />
        </>
      ) }
    </Nav>
  );
};

export default Navbar;
