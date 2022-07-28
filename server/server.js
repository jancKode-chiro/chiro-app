const express = require('express');
require('dotenv').config();
const cors = require('cors')
const next = require('next');
const bodyParser = require('body-parser');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

console.log(' process.env.TWILIO_ACCOUNT_SID', process.env.TWILIO_AUTH_TOKEN)

const PORT = process.env.PORT || 9000;
const dev = process.env.NODE_ENV !== 'production';

const server = express();
server.use(cors({
  origin: '*'
}));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

const client = require('twilio')(accountSid, authToken);

server.post('/sms-service', async (req, res) => {
  const { phoneNumbers, message } = req.body;

  const allMessageRequests = await phoneNumbers.map((to) => {
    return client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
        body: message,
      })
      .then((msg) => {

        // return { success: true, sid: msg.sid };
        // Return a success response using the callback function
        return res.send(msg);
      })
      .catch((err) => {

        // return { success: false, error: err.message };
        return res.send(err);
      });
  });

  return allMessageRequests;
})

// server.post('/send-message', (req, res) => {
//   console.log('Server is Ready')
//   return handle(req, res);
// });

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on ${PORT}`);
});

module.exports = server;
