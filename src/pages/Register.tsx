import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import NotificationToast from '../components/NotificationToast';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log('User:', userCredential);
          // ...
        })
        .catch((error) => {
          if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
            NotificationToast({
              color: 'danger',
              duration: 5000,
              message: 'Email já cadastrado!',
              position: 'top-end'
            });
            return;
          }
          NotificationToast({
            color: 'danger',
            duration: 5000,
            message: 'Erro ao cadastrar usuário!',
            position: 'top-end'
          });
        });
      // Redirect to home or dashboard
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container className="mt-10 gap-5">
      <Typography variant="h4" className="text-center">
        Crie sua conta
      </Typography>
      <form onSubmit={handleRegister} className="flex flex-col items-center mt-4 gap-5">
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
          Register
        </Button>
      </form>
      <div className="mt-5"></div>
      <Typography variant="body1" className="text-center">
        Já possui uma conta?
      </Typography>
      <Button
        variant="text"
        color="secondary"
        className="w-80 mt-8"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </Container>
  );
};

export default Register;