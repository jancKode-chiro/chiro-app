import { DataStore } from 'aws-amplify';
import axios from 'axios';
import { Templates } from '../models';

// var fp = require('lodash/fp');

export const getTemplates = async () => {
  const templates = await DataStore.query(Templates);
  console.log('templates', templates);

  return templates;
};
