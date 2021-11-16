/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
    TWILIO_ACCOUNT_SID
    TWILIO_AUTH_TOKEN
    TWILIO_PHONE_NUMBER
Amplify Params - DO NOT EDIT */


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

exports.handler = (event, context, callback) => {

    let response;

    // Send a text message
    client.messages.create({
        body: JSON.stringify(event.body),
        to: JSON.stringify(event.to),  // your phone number
        from: JSON.stringify(phoneNumber), // a valid Twilio number
    })
        .then((message) => {
            // Success, return message 
            response = {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(`Successfully sent your message: ${message.id}`)
            }
            callback(null, { statusCode: 200, body: JSON.stringify(`Successfully sent your message: ${JSON.stringify(message.id)}`) });
            return JSON.stringify(response);
        })
        .catch((e) => {
            // Error, return error object
            response = {
                'statusCode': 404,
                'body': JSON.stringify(`Error while processing your request: ${e}`)
            }
            callback(Error(JSON.stringify(e)));
            return JSON.stringify(response);
        });

};

