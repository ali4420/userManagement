// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/userSlice';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const Form = styled.form`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
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

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  useEffect(() => {
    setUsername(currentUser.username);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert('Please fill in all fields.');
      return;
    }
    dispatch(updateProfile({ username, email }));
    alert('Profile updated successfully!');
  };

  return (
    <ProfileContainer>
      <Form onSubmit={handleUpdate}>
        <h2>Edit Profile</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Button type="submit">Update Profile</Button>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;
