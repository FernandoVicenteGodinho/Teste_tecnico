import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { firestore } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Header from '../components/Header';

interface ScheduledMessage {
  id: string;
  message: string;
  scheduleTime: string;
  status: string;
}

const ManageMessages: React.FC = () => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'scheduledMessages'));
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ScheduledMessage[];
        setMessages(messagesData);
        console.log('Mensagens:', messagesData);
      } catch (error) {
        console.error('Erro ao buscar mensagens agendadas:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
       <Header />
    <Container className="mt-10">
      <Typography variant="h4" className="text-center">
        Status das Mensagens
      </Typography>
      <List className="mt-4 w-80 mx-auto">
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText
              primary={`Mensagem: ${message.message}`}
              secondary={`Status: ${message.status} | Envio: ${message.scheduleTime}`}
              />
          </ListItem>
        ))}
      </List>
    </Container>
        </>
  );
};

export default ManageMessages;