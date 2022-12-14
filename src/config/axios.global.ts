import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bm-backendprod-port.up.railway.app/',
});
