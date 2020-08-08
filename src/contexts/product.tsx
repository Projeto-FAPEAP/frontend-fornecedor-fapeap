import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import AuthContext from './auth';

interface IProducts {
  id: string;
  nome: string;
  preco: string;
  status_produto: number;
  estoque_produto: number;
  unidade_medida: string | number;
}

interface IProductsContextData {
  productList: IProducts[] | null;
  getAllProducts(): Promise<void>;
  loading: boolean;
}

const ProductContext = createContext<IProductsContextData>(
  {} as IProductsContextData,
);
export const ProductProvider: React.FC = ({ children }) => {
  const [productList, setProductList] = useState<IProducts[] | null>([]);
  const [loading, setLoading] = useState(true);
  const { user, signed } = useContext(AuthContext);
  useEffect(() => {
    if (signed) {
      getAllProducts();
    }
  }, []);

  function handleMeasurement(data: Array<IProducts>): void {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].unidade_medida === '1') {
        data[i].unidade_medida = '1 kg';
      } else if (data[i].unidade_medida === '2') {
        data[i].unidade_medida = '1 Litro';
      } else if (data[i].unidade_medida === '3') {
        data[i].unidade_medida = '500 gramas';
      } else if (data[i].unidade_medida === '4') {
        data[i].unidade_medida = '500 ml';
      }
    }
    setProductList(data);
  }

  async function getAllProducts(): Promise<void> {
    const userLoaded = await AsyncStorage.getItem('@QueroAçaí-Fornecedor:user');
    setLoading(true);

    try {
      const response = await api.get(
        `${api.defaults.baseURL}/produto/${JSON.parse(userLoaded).id}`,
      );
      handleMeasurement(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === 'Network Error') {
        Alert.alert('Verifique sua conexão de internet e tente novamente!!');
      } else {
        console.log(JSON.stringify(error, null, 2));
        console.log(error, 'jonathan');
        console.log(Object(error.response), 'salve');
        Alert.alert(error.response.data.error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    }
  }

  return (
    <ProductContext.Provider value={{ getAllProducts, loading, productList }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts(): IProductsContextData {
  const context = useContext(ProductContext);

  return context;
}

export default ProductContext;
