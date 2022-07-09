import React from 'react';

const express = require('express');
const router = express.router();

router.get('*', (req: any, res: any) => {
  res.end('sample');
});
