import axios from 'axios';

export const stripePayment = async (
  url: string,
  pmId: string,
  message: string,
  passcode = '0101'
) => {
  const data = {
    message: message,
    pmId: pmId,
    passcode,
  };

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
  };
  try {
    const result = await axios
      .post(url, data, config)
      .then((result) => {
        return {
          status: 'OK',
          data: result,
        };
      })
      .catch((error) => {
        return {
          status: 'Error',
          data: error.message,
        };
      });
    return result;
  } catch (err) {
    console.log('error on send sms', err);
  }
};
