// type sendSmsProps = {
//   recipient: string[];
//   message: string;
//   passcode: string;
// };
import axios from 'axios';

export const sendSMS = async (
  url: string,
  recipient: string,
  message: string,
  passcode = '0101',
  isScheduled: Date
) => {
  const data = {
    message,
    recipients: recipient,
    passcode,
    isScheduled,
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
    const result = axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data: data,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })
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
    // const result = await axios
    //   .post(`${process.env.REACT_APP_API_URL}${url}`, data, config)
    //   .then((result) => {
    //     return {
    //       status: 'OK',
    //       data: result,
    //     };
    //   })
    //   .catch((error) => {
    //     return {
    //       status: 'Error',
    //       data: error.message,
    //     };
    //   });
    return result;
  } catch (err) {
    console.log('error on send sms', err);
  }
};
