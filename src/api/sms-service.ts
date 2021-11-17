import axios from 'axios';
import { smsservice } from './sms-base-api';

type sendSmsProps = {
  recipient: string[];
  message: string;
  passcode: string;
};

export const sendSMS = async (
  url: string,
  recipient: string,
  message: string,
  passcode = '0101'
) => {
  const result = await fetch(
    'https://sms-notifications-4093-ajowbv.twil.io/send-messages',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        recipients: recipient,
        passcode: passcode,
      }),
    }
  )
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log('Error while sending sms', error);
    });

  return result;
};
