import axios from 'axios';

const api = axios.create({ baseURL: 'https://fapeap.colares.net.br' });
export default api;
