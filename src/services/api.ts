import axios from 'axios';
import { API_TOKEN } from '../../config';

const api = axios.create({
  baseURL: 'https://demo.vnda.com.br/api/v2',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token token=${API_TOKEN}`,
  },
});

export default api;
