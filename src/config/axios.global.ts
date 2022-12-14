import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://ec2-174-129-57-88.compute-1.amazonaws.com:3001/',
});
