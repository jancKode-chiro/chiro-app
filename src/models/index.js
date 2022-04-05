// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "ADMIN": "ADMIN",
  "USER": "USER"
};

const { Templates, Payment, Contacts, User, UserDetails } = initSchema(schema);

export {
  Templates,
  Payment,
  Contacts,
  User,
  UserRole,
  UserDetails
};