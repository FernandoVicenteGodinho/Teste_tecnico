import React, { useState, useEffect } from 'react';
import { firestore, functions } from '../firebase/firebaseConfig';
import { Button, Checkbox, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

const SendMessage: React.FC = () => {
  const [contacts, setContacts] = useState<{ id: string; name: string; phone: string }[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('contacts').onSnapshot((snapshot) => {
      const contactsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as { id: string; name: string; phone: string }));
      setContacts(contactsData);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() && selectedContacts.length > 0) {
      const sendMessageFunction = functions.httpsCallable('sendMessage');
      await sendMessageFunction({ contacts: selectedContacts, message, scheduleTime });
      setMessage('');
      setSelectedContacts([]);
      setScheduleTime('');
    }
  };

  const handleSelectContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="text-center">
        Send Message Page
      </Typography>
      <div className="flex flex-col items-center mt-4">
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4 w-80"
        />
        <TextField
          label="Schedule Time"
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="mb-4 w-80"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} className="w-80">
          Send Message
        </Button>
      </div>
      <List className="mt-4 w-80 mx-auto">
        {contacts.map((contact) => (
          <ListItem key={contact.id}  onClick={() => handleSelectContact(contact.id)}>
            <Checkbox checked={selectedContacts.includes(contact.id)} />
            <ListItemText primary={`${contact.name} - ${contact.phone}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SendMessage;