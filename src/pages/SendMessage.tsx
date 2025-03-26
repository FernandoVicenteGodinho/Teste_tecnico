import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { firestore } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Importar o hook useParams
import Header from '../components/Header';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const SendMessage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const { id: connectionId } = useParams<{ id: string }>(); // Extrair o connectionId da URL

  useEffect(() => {
    if (!connectionId) {
      console.error('connectionId is null');
      return;
    }

    const fetchContacts = async () => {
      try {
        // Buscar contatos da subcoleção 'contacts' dentro da conexão
        const snapshot = await getDocs(collection(doc(firestore, 'connections', connectionId), 'contacts'));
        const contactsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];
        setContacts(contactsData);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    };

    fetchContacts();
  }, [connectionId]);

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !scheduleTime || selectedContacts.length === 0) {
      alert('Preencha todos os campos e selecione pelo menos um contato.');
      return;
    }

    try {
      // Salvar a mensagem no Firestore
      await addDoc(collection(firestore, 'scheduledMessages'), {
        message,
        scheduleTime,
        contacts: selectedContacts,
        status: 'scheduled', // Status inicial
      });

      alert('Mensagem agendada com sucesso!');
      setMessage('');
      setScheduleTime('');
      setSelectedContacts([]);
    } catch (error) {
      console.error('Erro ao agendar mensagem:', error);
    }
  };

  return (
    <Container className="mt-10">
      <Header />

      <Typography variant="h4" className="text-center">
        Enviar Mensagem
      </Typography>
      <div className="flex flex-col items-center mt-4 gap-5">
        <TextField
          label="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4 w-80"
        />
        <TextField
          label="Horário de Envio"
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="mb-4 w-80"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} className="w-80">
          Agendar Mensagem
        </Button>
      </div>
      <div className="flex flex-col items-center mt-4 gap-5">

      <List className="w-auto mx-auto">
        {contacts.map((contact) => (
          <ListItem key={contact.id} onClick={() => handleSelectContact(contact.id)}>
            <Checkbox checked={selectedContacts.includes(contact.id)} />
            <ListItemText primary={`${contact.name} - ${contact.phone}`} />
          </ListItem>
        ))}
      </List>
      </div>
    </Container>
  );
};

export default SendMessage;