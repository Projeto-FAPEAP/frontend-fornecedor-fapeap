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
  arquivos: [{ url: string }];
}

interface IProductsContextData {
  productList: IProducts[] | null;
  getAllProducts(): Promise<void>;
  addProduct(product: IProducts): void;
  editProduct(product: IProducts): Promise<void>;
  editProductMedia(uri: string, id: string): Promise<void>;
  removeProduct(id: string): Promise<void>;
  loading: boolean;
  isUpdate: boolean;
}

const ProductContext = createContext<IProductsContextData>(
  {} as IProductsContextData,
);
export const ProductProvider: React.FC = ({ children }) => {
  const [productList, setProductList] = useState<IProducts[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
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

  function addProduct(product: IProducts): void {
    setIsUpdate(true);
    console.log(JSON.stringify(product, null, 2));
    const array = productList;
    array?.push(product);
    array?.sort();
    console.log(JSON.stringify(array, null, 2));
    setProductList(array);
    setIsUpdate(false);
  }

  async function removeProduct(id: string): Promise<void> {
    setIsUpdate(true);
    let k = 0;
    const array = productList;
    array?.forEach((value, index) => {
      if (value.id === id) {
        k = index;
      }
    });
    if (k === 0) {
      array?.shift();
    } else {
      array?.splice(k);
    }

    setProductList(array);
    setIsUpdate(false);
  }
  async function editProduct(product: IProducts): Promise<void> {
    setIsUpdate(true);
    const array = productList;
    console.log(product, 'jjjj');
    array?.forEach((value) => {
      if (value.id === product.id) {
        value.nome = product.nome;
        value.preco = product.preco;
        value.status_produto = product.status_produto;
        value.estoque_produto = product.estoque_produto;
        value.unidade_medida = product.unidade_medida;
      }
    });
    console.log(JSON.stringify(array, null, 2), 'jjjj');

    setProductList(array);
    setIsUpdate(false);
  }

  async function editProductMedia(uri: string, id: string): Promise<void> {
    setIsUpdate(true);
    const array = productList;
    console.log(uri, 'jjjjjjjjjjjjjjjjjjj', id);
    array?.forEach((value) => {
      if (value.id === id) {
        if (value.arquivos[0].url !== uri) {
          console.log(value.arquivos[0].url, '', uri);
          value.arquivos[0].url = uri;
        }
      }
    });

    setProductList(array);
    setIsUpdate(false);
  }

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        editProduct,
        editProductMedia,
        getAllProducts,
        removeProduct,
        loading,
        productList,
        isUpdate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts(): IProductsContextData {
  const context = useContext(ProductContext);

  return context;
}

export default ProductContext;
