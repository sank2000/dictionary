import client from './client';

const search = (key) => client.get(`/v2/entries/en/${key}`);

export default {
  search,
};
