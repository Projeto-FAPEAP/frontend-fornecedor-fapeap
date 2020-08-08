import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from './auth'
import api from '../services/api';

interface IOrders {
  id: string;
  status_pedido: string;
  delivery: boolean;
  total: number;
  subtotal:number;
  taxa_entrega:number|undefined;
  consumidor: {
    nome: string;
    logradouro:string;
    numero_local:string;
  };
  created_at:string;
}

interface IOrdersContextData {
  ordersData: IOrders[]|null;
  getAllOrders():Promise<void>;
  loading:boolean;
  pendingLength:number;
}

const OrderContext = createContext<IOrdersContextData>({} as IOrdersContextData);
export const OrdersProvider: React.FC = ({ children }) => {
  const [ordersData, setOrdersData] = useState<IOrders[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [pendingLength, setPendingLength] = useState(0);
  const {user,signed} = useContext(AuthContext)
  useEffect(() => {
    setTimeout(function () {
      if(signed){
        getAllOrders();
      }
      
    
    }, 1000);
  }, []);

  function handleOrderList(array: IOrders[]): void {
    /* setLoading(true) */
    const ordersdata: IOrders[] = array;
    const pending = [];
    const confirmed = [];
    const total: IOrders[] = array;
    let j = 0;
    let k = 0;

    for (let i = 0; i < ordersdata.length; i += 1) {
      if (ordersdata[i].status_pedido === 'Pendente') {
        pending[j] = ordersdata[i];
        j += 1;
      } else {
        confirmed[k] = ordersdata[i];
        k += 1;
      }
    }

    for (let i = 0; i < array.length; i += 1) {
      if (pending.length - 1 >= i) {
        total[i] = pending[i];
      } else {
        total[i] = confirmed[i - pending.length];
      }
    }
    /* setLoading(false) */
    setPendingLength(pending.length);
    setOrdersData(total);
  }

  async function getAllOrders(): Promise<void> {
    
    setLoading(true);
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos`,
      );
        console.log(JSON.stringify(response.data, null, 2)); 
      
      handleOrderList(response.data);

      setLoading(false);
      console.log(loading);
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
    <OrderContext.Provider
      value={{ pendingLength, loading,getAllOrders,ordersData }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export function useAuth(): IOrdersContextData {
  const context = useContext(OrderContext);

  return context;
}

export default OrderContext;