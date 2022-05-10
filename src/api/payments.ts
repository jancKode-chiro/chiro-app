import { DataStore, SortDirection } from 'aws-amplify';
import { Payment } from '../models';

import moment from 'moment';

export const getBalance = async (uID: string) => {
  const balance = await DataStore.query(Payment, (p) => p.userID('eq', uID), {
    sort: (s) => s.payment_date(SortDirection.DESCENDING),
  });

  return balance[0].balance;
};

export const addBalance = async (uId: string, amount: number) => {
  let currentDate = moment().format('YYYY-MM-DDThh:mm:ss.sssZ');
  const originalBalance = await DataStore.query(
    Payment,
    (user) => user.userID('eq', uId),
    {
      sort: (s) => s.payment_date(SortDirection.DESCENDING),
      limit: 1,
    }
  );
  // const sum = originalBalance.reduce(
  //   (partialSum, a) => partialSum + a.balance!,
  //   0
  // );

  try {
    await DataStore.save(
      new Payment({
        userID: uId,
        amount: amount,
        balance: originalBalance[0].balance! + amount,
        payment_date: currentDate,
        payment_type: 'stripe',
      })
    );
    return originalBalance[0].balance! + amount;
  } catch (error) {
    return error;
  }
};
