const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .listen(PORT, () => console.log(`Server is running in port ${PORT}`))
  .prepare()
  .then(() => {
    const server = express();

    server.post('/send-sms', (req, res) => {
      console.log('Server is Ready')
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })

  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
