import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Você pode substituir por um spinner ou tela de carregamento
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;