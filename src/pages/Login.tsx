import React, { FormEvent, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { Button, Container, TextField, Typography } from '@mui/material';
import {  signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('Email:', email);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log('User:', user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      // Redirect to home or dashboard
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
      <Container className="mt-10 gap-5">
        <Typography variant="h4" className="text-center">
          Login Page
        </Typography>
        <form onSubmit={handleLogin} className="flex flex-col items-center mt-4 gap-5">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-80"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-80"
          />
          <Button type="submit" variant="contained" color="primary" className="w-80">
            Login
          </Button>
        </form>
      <div className="mt-5"></div>
      <Typography variant="body1" className="text-center">
        Don't have an account?
      </Typography>
      <Button
        variant="text"
        color="secondary"
        className="w-80 mt-8"
        onClick={() => console.log('Redirect to register')}
      >
        Register
      </Button>
      </Container>
  );
};

export default Login;