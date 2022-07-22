const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.get('/testing', (req, res) => {
  console.log('Hello')
  res.send("Testing server")
  return handle(req, res);
})

// server.post('/send-message', (req, res) => {
//   console.log('Server is Ready')
//   return handle(req, res);
// });

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on ${PORT}`);
});

// server.listen(3000);
