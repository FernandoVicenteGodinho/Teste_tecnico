import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { firestore } from '../firebase/firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Importar o hook de navegação
import Header from '../components/Header';

interface Connection {
  id: string;
  name: string;
}

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [newConnectionName, setNewConnectionName] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Observar todas as conexões no Firestore
    const unsubscribe = onSnapshot(collection(firestore, 'connections'), (snapshot) => {
      const connectionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Connection[];
      setConnections(connectionsData);
    });

    return unsubscribe; // Cancelar a inscrição ao desmontar o componente
  }, []);

  const handleAddConnection = async () => {
    if (!newConnectionName.trim()) {
      console.error('Nome da conexão não pode estar vazio');
      return;
    }

    try {
      // Adicionar nova conexão ao Firestore
      await addDoc(collection(firestore, 'connections'), {
        name: newConnectionName,
      });
      setNewConnectionName(''); // Limpar o campo de entrada
    } catch (error) {
      console.error('Erro ao adicionar conexão:', error);
    }
  };

  const handleNavigateToContacts = (connectionId: string) => {
    navigate(`/connections/${connectionId}/contacts`);
  };
  const handleNavigateSendMenssage = (connectionId: string) => {
    // Navegar para a página de contatos da conexão
    navigate(`/connections/${connectionId}/send-message`);
  };

  return (
    <Container className="mt-10 ">
      <Header />
      <Typography variant="h4" className="text-center">
        Gerenciar Conexões
      </Typography>
      <div className="flex flex-col items-center mt-4 gap-5">
        <TextField
          label="Nome da Conexão"
          value={newConnectionName}
          onChange={(e) => setNewConnectionName(e.target.value)}
          className="mb-4 w-80"
        />
        <Button variant="contained" color="primary" onClick={handleAddConnection} className="w-80">
          Adicionar Conexão
        </Button>
      </div>
      <div className="flex flex-col items-center mt-4">
      <List className="mt-4 w-auto mx-auto">
        {connections.map((connection) => (
          <ListItem key={connection.id} className="flex justify-between items-center gap-5">
            <ListItemText primary={connection.name} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleNavigateToContacts(connection.id)}
            >
              Ver Contatos
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigateSendMenssage(connection.id)}
            >
              Enviar menssagem
            </Button>
          </ListItem>
        ))}
      </List>
      </div>
    </Container>
  );
};

export default Connections;