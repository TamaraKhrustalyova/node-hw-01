import * as contactService from './contacts.js';
import { program } from "commander";

const {listContacts, getContactById, addContact, removeContact} = contactService;

const invokeAction = async ({action, contactId, name, email, phone}) => {
    try {
        switch(action){
            case 'list':
                const contactsList = await listContacts();
                return console.table(contactsList);
            case 'get':
                const oneContact = await getContactById(contactId);
                return console.log(oneContact);
            case 'add':
                const newContact = await addContact(name, email, phone);
                return console.log(newContact);
            case 'remove':
                const deleteContact = await removeContact(contactId);
                return console.log(deleteContact);
            default: 
                console.warn("\x1B[31m Unknown action type!");
        }
    } catch(error){
        console.log(error.message);
        throw error;
    } 
};

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

invokeAction(options);

