import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebaseConfig';
import { Button, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<string[]>([]);
  const [newConnection, setNewConnection] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('connections').onSnapshot((snapshot) => {
      const connectionsData = snapshot.docs.map((doc) => doc.data().name);
      setConnections(connectionsData);
    });
    return unsubscribe;
  }, []);

  const handleAddConnection = async () => {
    if (newConnection.trim()) {
      await firestore.collection('connections').add({ name: newConnection });
      setNewConnection('');
    }
  };

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="text-center">
        Connections Page
      </Typography>
      <div className="flex flex-col items-center mt-4">
        <TextField
          label="New Connection"
          value={newConnection}
          onChange={(e) => setNewConnection(e.target.value)}
          className="mb-4 w-80"
        />
        <Button variant="contained" color="primary" onClick={handleAddConnection} className="w-80">
          Add Connection
        </Button>
      </div>
      <List className="mt-4 w-80 mx-auto">
        {connections.map((connection, index) => (
          <ListItem key={index}>
            <ListItemText primary={connection} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Connections;