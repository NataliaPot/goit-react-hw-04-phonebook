import { nanoid } from 'nanoid';
import {
  TitleContacts,
  TitlePhonebook,
} from './ContactForm/ContactForm.styled';
import ContactList from './ContactList/ContactList';
import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const savedContacts = localStorage.getItem(LS_KEY);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const createContact = contact => {
    const { name, number } = contact;
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newUser = {
      ...contact,
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => [...prev, newUser]);
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm createContact={createContact} />
      <TitleContacts>Contacts</TitleContacts>
      <ContactList
        contacts={contacts}
        filter={filter}
        onFiltered={handleChangeFilter}
        handleDelete={handleDelete}
      ></ContactList>
    </>
  );
};
