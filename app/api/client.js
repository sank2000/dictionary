import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'https://api.dictionaryapi.dev/api',
});

export default apiClient;
