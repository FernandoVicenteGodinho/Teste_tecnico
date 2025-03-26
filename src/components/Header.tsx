import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="absolute" style={{ top: 0, left: 0, right: 0 }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="cursor-pointer" onClick={() => navigate('/')}>
          Dashboard
        </Typography>
        <div>
          <Button color="inherit" onClick={() => navigate('/connections')}>
            Gerenciar Conexões
          </Button>
          <Button color="inherit" onClick={() => navigate('/manage-messages')}>
            Gerenciar Mensagens
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;