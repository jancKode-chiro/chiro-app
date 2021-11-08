// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "ADMIN": "ADMIN",
  "USER": "USER"
};

const { Payment, Contacts, User, UserDetails } = initSchema(schema);

export {
  Payment,
  Contacts,
  User,
  UserRole,
  UserDetails
};