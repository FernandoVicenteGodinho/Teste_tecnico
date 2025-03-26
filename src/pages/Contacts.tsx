import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { firestore } from '../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Importar o hook useParams
import Header from '../components/Header';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const { id: connectionId } = useParams<{ id: string }>(); // Extrair o connectionId da URL

  useEffect(() => {
    if (!connectionId) {
      console.error('connectionId is null');
      return () => {};
    }

    // Observar os contatos da conexão no Firestore
    const unsubscribe = onSnapshot(
      collection(doc(firestore, 'connections', connectionId), 'contacts'),
      (snapshot) => {
        const contactsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Contact));
        setContacts(contactsData);
      }
    );

    return unsubscribe; // Cancelar a inscrição ao desmontar o componente
  }, [connectionId]);

  const handleAddContact = async () => {
    if (!connectionId) {
      console.error('connectionId is null');
      return;
    }
    if (newContact.name.trim() && newContact.phone.trim()) {
      await addDoc(collection(doc(firestore, 'connections', connectionId), 'contacts'), newContact);
      setNewContact({ name: '', phone: '' });
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!connectionId) {
      console.error('connectionId is null');
      return;
    }
    await deleteDoc(doc(collection(doc(firestore, 'connections', connectionId), 'contacts'), contactId));
  };

  return (
    <Container className="mt-10">
             <Header />

      <Typography variant="h4" className="text-center">
        Gerenciar Contatos
      </Typography>
      <div className="flex flex-col items-center mt-4 gap-5">
        <TextField
          label="Nome do Contato"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="mb-4 w-80"
        />
        <TextField
          label="Telefone"
          type='tel'
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          className="mb-4 w-80"
        />
        <Button variant="contained" color="primary" onClick={handleAddContact} className="w-80">
          Adicionar Contato
        </Button>
      </div>
      <div className="flex flex-col items-center mt-4 gap-5">

      <List className="mt-4 w-auto mx-auto">
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemText primary={`${contact.name} - ${contact.phone}`} />
            <IconButton onClick={() => handleDeleteContact(contact.id)}>
              <p className="text-red-600 text-sm">Excluir</p>
            </IconButton>
          </ListItem>
        ))}
      </List>
      </div>
    </Container>
  );
};

export default Contacts;