import { DataStore, SortDirection } from 'aws-amplify';
import { Payment } from '../models';

import moment from 'moment';

export const getBalance = async (uID: string) => {
  const balance = await DataStore.query(Payment, (p) => p.userID('eq', uID), {
    sort: (s) => s.payment_date(SortDirection.DESCENDING),
  });
  let totalBalance = 0;

  balance.map((addBalance) => {
    totalBalance = totalBalance + addBalance.balance!;
    return totalBalance;
  });

  return totalBalance;
};

export const addBalance = async (uId: string, amount: number) => {
  let currentDate = moment().format('YYYY-MM-DDThh:mm:ss.sssZ');
  const originalBalance = await DataStore.query(
    Payment,
    (user) => user.userID('eq', uId),
    {
      sort: (s) => s.payment_date(SortDirection.DESCENDING),
    }
  );
  let currentBalance = 0;
  originalBalance.map((balance) => {
    currentBalance = currentBalance + balance.balance!;
    return currentBalance;
  });

  try {
    const balanceAdded = await DataStore.save(
      new Payment({
        userID: uId,
        amount: amount,
        balance: currentBalance + amount,
        payment_date: currentDate,
        payment_type: 'stripe',
      })
    );

    return balanceAdded;
  } catch (error) {
    return error;
  }
};

export const walletBalance = async (uId: string) => {
  require('dotenv').config(uId);

  const client = require('dotenv')(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
  );
  client.balance.fetch().then((data: { balance: number; currency: any }) => {
    const balance = Math.round(data.balance * 100) / 100;
    const currency = data.currency;
    console.log(`Your account balance is ${balance} ${currency}.`);
  });
};
