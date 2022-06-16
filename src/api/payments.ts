import { DataStore, SortDirection } from 'aws-amplify';
import { Payment } from '../models';

import moment from 'moment';

export const getBalance = async (uID: string) => {
  const balance = await DataStore.query(Payment, (p) => p.userID('eq', uID), {
    sort: (s) => s.payment_date(SortDirection.DESCENDING),
    limit: 1,
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

export const getPayments = async (uId: string) => {
  // let setDateHistory = moment().format('MM-DD-YYYYThh:mm:ss.sssZ');
  console.log('uId', uId);
  const result = await DataStore.query(
    Payment,
    (payment) => payment.userID('eq', uId),
    {
      sort: (s) => s.payment_date(SortDirection.DESCENDING),
    }
  );
  // try {
  //   await {
  //     payment_date: setDateHistory,
  //   };
  // } catch (payment_date) {
  //   return payment_date;
  // }
  console.log('result', result);
  return result;
};

export const updateBalance = async (
  uId: string,
  newBalance: number,
  totalAmountDeducted: number
) => {
  let currentDate = moment().format('YYYY-MM-DDThh:mm:ss.sssZ');
  try {
    await DataStore.save(
      new Payment({
        userID: uId,
        amount: totalAmountDeducted,
        balance: newBalance,
        payment_date: currentDate,
        payment_type: 'sms payment deduction',
      })
    );
    return newBalance;
  } catch (error) {
    return error;
  }
};
