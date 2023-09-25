import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
// const moviesPath = path.join(__dirname, "contacts.json")

const updateContactsList = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async() => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }
  
  export const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(c => c.contactId === contactId);
    return result || null;
  }
   
  export const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name, 
        email,
        phone,
    }
    contacts.push(newContact);
    await updateContactsList(contacts);
    return newContact;
  }
  
  export const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(c => c.contactId === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContactsList(contacts);
    return result;
  }