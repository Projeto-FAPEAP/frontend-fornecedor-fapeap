import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const api = axios.create({ baseURL: 'https://fapeap.colares.net.br' });
//export default api;

/* const api = axios.create({ baseURL: 'http://192.168.1.100:3333' }); */

api.interceptors.request.use(
    
    async (config) => {
        const tokenLoaded = await AsyncStorage.getItem(
            '@QueroAçaí-Fornecedor:token',
          );
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