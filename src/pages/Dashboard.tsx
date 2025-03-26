import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-10 flex flex-col items-center gap-5">
      <Typography variant="h4" className="mb-6 text-center">
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="mb-4 w-80"
        onClick={() => navigate('/connections')}
      >
        Gerenciar Conexões
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="mb-4 w-80"
        onClick={() => navigate('/manage-messages')}
      >
        Gerenciar Mensagens
      </Button>
    </Container>
  );
};

export default Dashboard;