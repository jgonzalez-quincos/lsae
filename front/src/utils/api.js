import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',  // Proxied to backend
  headers: { 'Content-Type': 'application/json' }
});