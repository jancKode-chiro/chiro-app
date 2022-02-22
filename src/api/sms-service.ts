// type sendSmsProps = {
//   recipient: string[];
//   message: string;
//   passcode: string;
// };

export const sendSMS = async (
  url: string,
  recipient: string,
  message: string,
  passcode = '0101'
) => {
  const result = await fetch(
    // 'https://sms-notifications-4093-ajowbv.twil.io/send-messages',
    'https://lead-flo-sms-service-2056.twil.io/send-sms',
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
      return {
        status: 'OK',
        data: result,
      };
    })
    .catch((error) => {
      return { status: 'error', data: error };
    });

  return result;
};
