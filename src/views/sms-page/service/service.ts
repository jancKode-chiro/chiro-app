import React from 'react';

const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const showRoutes = require('./routes/routes');

    server.use('*', showRoutes);

    server.get('*', (req: any, res: any) => {
      return handle(req, res);
    });

    server.listen(PORT, (err: any) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })

  .catch((ex: { stack: any }) => {
    console.error(ex.stack);
    process.exit(1);
  });
