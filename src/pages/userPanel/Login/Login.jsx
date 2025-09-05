// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/features/auth/AuthSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate API request
    const fakeToken = 'fake_jwt_token_123';
    const fakeUser = { id: 1, name: 'John Doe', email };

    // Save to localStorage
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('User', JSON.stringify(fakeUser));

    // Update Redux state
    dispatch(loginSuccess({ token: fakeToken, user: fakeUser }));
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
