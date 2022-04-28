import axios from 'axios';
export const createPaymentIntent = async (url: string, amount: number) => {
  const data = {
    amount: amount,
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
          data: result.data,
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
