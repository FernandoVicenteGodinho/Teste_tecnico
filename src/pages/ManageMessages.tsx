import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebaseConfig';
import { Container, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@mui/material';

const ManageMessages: React.FC = () => {
  const [messages, setMessages] = useState<{ id: string; message: string; status: string }[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').onSnapshot((snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as { id: string; message: string; status: string }));
      setMessages(messagesData);
    });
    return unsubscribe;
  }, []);

  const filteredMessages = messages.filter((message) => filter === 'all' || message.status === filter);

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="text-center">
        Manage Messages Page
      </Typography>
      <div className="flex justify-center mt-4">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as string)} className="w-80">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="sent">Sent</MenuItem>
          <MenuItem value="scheduled">Scheduled</MenuItem>
        </Select>
      </div>
      <List className="mt-4 w-80 mx-auto">
        {filteredMessages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText primary={`${message.message} - ${message.status}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ManageMessages;