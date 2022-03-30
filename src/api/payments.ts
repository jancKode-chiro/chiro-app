import { DataStore } from 'aws-amplify';
import { Payment } from '../models';

import moment from 'moment';

export const getBalance = async (id: string) => {
  const balance = await DataStore.query(Payment, (p) => p.id('eq', id));

  return balance.length ? balance[0] : null;
};
