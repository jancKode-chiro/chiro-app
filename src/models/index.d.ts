import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export declare class UserDetails {
  readonly address?: string | null;
  readonly country?: string | null;
  readonly country_code?: string | null;
  constructor(init: ModelInit<UserDetails>);
}

type TemplatesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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

export declare class Templates {
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Templates, TemplatesMetaData>);
  static copyOf(source: Templates, mutator: (draft: MutableModel<Templates, TemplatesMetaData>) => MutableModel<Templates, TemplatesMetaData> | void): Templates;
}

export declare class Payment {
  readonly id: string;
  readonly amount?: number | null;
  readonly payment_type?: string | null;
  readonly payment_date?: string | null;
  readonly balance?: number | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Payment, PaymentMetaData>);
  static copyOf(source: Payment, mutator: (draft: MutableModel<Payment, PaymentMetaData>) => MutableModel<Payment, PaymentMetaData> | void): Payment;
}

export declare class Contacts {
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly group?: string | null;
  readonly phone_number?: string | null;
  readonly date_added?: string | null;
  readonly date_updated?: string | null;
  readonly userID?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Contacts, ContactsMetaData>);
  static copyOf(source: Contacts, mutator: (draft: MutableModel<Contacts, ContactsMetaData>) => MutableModel<Contacts, ContactsMetaData> | void): Contacts;
}

export declare class User {
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly create_date?: string | null;
  readonly email?: string | null;
  readonly phone_number?: string | null;
  readonly user_details?: UserDetails | null;
  readonly role?: UserRole | keyof typeof UserRole | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}