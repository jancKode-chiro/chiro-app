import { DataStore } from 'aws-amplify';
import { Contacts } from '../models';

export const getContacts = async (userId: string): Promise<Contacts[]> => {
  const result = await DataStore.query(Contacts, (contact) =>
    contact.userID('eq', userId)
  );

  return result;
};
