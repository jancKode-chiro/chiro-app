import { DataStore } from 'aws-amplify';
import { Templates } from '../models';

export const getTemplates = async () => {
  const templates = await DataStore.query(Templates);
  return templates;
};

export const addTemplate = async (title: string, content: string) => {
  try {
    await DataStore.save(
      new Templates({
        title: title,
        content: content,
      })
    );
  } catch (err) {
    return err;
  }
};

export const updateTemplate = async (
  id: string,
  newTitle: string,
  newContent: string
) => {
  try {
    const original = await DataStore.query(Templates, id);
    await DataStore.save(
      Templates.copyOf(original!, (updated) => {
        updated.title = newTitle;
        updated.content = newContent;
      })
    );
  } catch (error) {
    return error;
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    const toDelete = await DataStore.query(Templates, id);

    DataStore.delete(toDelete!);
  } catch (err) {}
};
