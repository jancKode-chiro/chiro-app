import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export declare class UserDetails {
  readonly address?: string;
  readonly country?: string;
  readonly country_code?: string;
  constructor(init: ModelInit<UserDetails>);
}

type PaymentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ContactsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Payment {
  readonly id: string;
  readonly amount?: number;
  readonly payment_type?: string;
  readonly payment_date?: string;
  readonly balance?: number;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Payment, PaymentMetaData>);
  static copyOf(source: Payment, mutator: (draft: MutableModel<Payment, PaymentMetaData>) => MutableModel<Payment, PaymentMetaData> | void): Payment;
}

export declare class Contacts {
  readonly id: string;
  readonly name?: string;
  readonly group?: string;
  readonly phone_number?: string;
  readonly date_added?: string;
  readonly date_updated?: string;
  readonly userID?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Contacts, ContactsMetaData>);
  static copyOf(source: Contacts, mutator: (draft: MutableModel<Contacts, ContactsMetaData>) => MutableModel<Contacts, ContactsMetaData> | void): Contacts;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly create_date?: string;
  readonly email?: string;
  readonly phone_number?: string;
  readonly user_details?: UserDetails;
  readonly contacts?: (Contacts | null)[];
  readonly payments?: (Payment | null)[];
  readonly role?: UserRole | keyof typeof UserRole;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}