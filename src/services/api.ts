import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://fapeap.colares.net.br' });

api.interceptors.request.use(
  async (config) => {
    const tokenLoaded = await AsyncStorage.getItem(
      '@QueroAçaí-Fornecedor:token',
    );
    console.log('yyyyyyyoooooooooooooo', tokenLoaded);
    if (tokenLoaded) {
      config.headers.Authorization = `Bearer ${tokenLoaded}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
