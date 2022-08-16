import { DataStore } from 'aws-amplify';
import { Templates } from '../models';

export const getTemplates = async () => {
  const templates = await DataStore.query(Templates);
  return templates;
};
