import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebaseConfig';
import { Button, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  useEffect(() => {
    const unsubscribe = firestore.collection('contacts').onSnapshot((snapshot) => {
      const contactsData = snapshot.docs.map((doc) => doc.data() as { name: string; phone: string });
      setContacts(contactsData);
    });
    return unsubscribe;
  }, []);

  const handleAddContact = async () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      await firestore.collection('contacts').add(newContact);
      setNewContact({ name: '', phone: '' });
    }
  };

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="text-center">
        Contacts Page
      </Typography>
      <div className="flex flex-col items-center mt-4">
        <TextField
          label="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="mb-4 w-80"
        />
        <TextField
          label="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          className="mb-4 w-80"
        />
        <Button variant="contained" color="primary" onClick={handleAddContact} className="w-80">
          Add Contact
        </Button>
      </div>
      <List className="mt-4 w-80 mx-auto">
        {contacts.map((contact, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${contact.name} - ${contact.phone}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Contacts;