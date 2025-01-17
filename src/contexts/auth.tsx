import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  subscribeToNotification,
  unsubscribeToNotification,
} from '@services/notifications';

import api from '../services/api';

interface IUser {
  id: string;
  nome: string;
  email: string;
  telefone_whatsapp: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
  cep: string;
  created_at: string;
  updated_at: string;
  nome_fantasia: string;
  cpf_cnpj: string;
  telefone: string;
  taxa_delivery?: string;
  verificado: boolean;
  status_aprovado: string;
}

interface Response {
  responseState: boolean;
  responseStatus: string;
}

interface IResponseFornecedor {
  fornecedor: IUser;
  tokenFornecedor: string;
  status_aprovado: string;
}

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  logIn(cpfCnpj: string, password: string): Promise<ILocalResponse>;
  logOut(): void;
  loadingApp: boolean;
}

interface ILocalResponse {
  informacao: number;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingApp, setLoadingApp] = useState(true);
  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.message === 'Network Error') {
          Alert.alert('Erro de conexão', 'Verifique sua internet');
        }

        return Promise.reject(error);
      },
    );

    async function loadData(): Promise<void> {
      const userLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Fornecedor:user',
      );
      const tokenLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Fornecedor:token',
      );

      if (userLoaded && tokenLoaded) {
        api.defaults.headers.authorization = `Bearer ${tokenLoaded}`;
        setUser(JSON.parse(userLoaded));
      }

      setLoading(false);
      setLoadingApp(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!user) return;

    subscribeToNotification(user.id);
  }, [user]);

  const handleLogin = useCallback(
    async (cpfCnpj: string, password: string): Promise<ILocalResponse> => {
      setLoading(true);
      try {
        const response = await api.post<IResponseFornecedor>(
          `/sessao/fornecedor`,
          {
            cpf_cnpj: cpfCnpj,
            senha: password,
          },
        );
        console.log(response.data.status_aprovado, 'teste');
        if (response.data.status_aprovado === 'Em andamento') {
          setLoading(false);
          console.log('entrou aquiii');
          return new Promise((resolve, reject) => {
            resolve({ informacao: 0 });
          });
        }
        if (response.data.status_aprovado === 'Não aprovado') {
          setLoading(false);
          console.log('entrou aquiii');
          return new Promise((resolve, reject) => {
            resolve({ informacao: 1 });
          });
        }
        if (response.data.fornecedor.status_aprovado === 'Aprovado') {
          console.log('jonathandsdd', response.data.status_aprovado);
          const { fornecedor, tokenFornecedor } = response.data;

          setUser(fornecedor);
          api.defaults.headers.authorization = `Bearer ${tokenFornecedor}`;

          await AsyncStorage.setItem(
            '@QueroAçaí-Fornecedor:user',
            JSON.stringify(fornecedor),
          );
          await AsyncStorage.setItem(
            '@QueroAçaí-Fornecedor:token',
            tokenFornecedor,
          );
          setLoading(false);
          return new Promise((resolve, reject) => {
            resolve({ informacao: 2 });
          });
        }
      } catch (error) {
        const hasResponse = error.response?.data?.error;
        if (hasResponse) {
          Alert.alert('Ocorreu um erro', hasResponse);
        }
      }
      setLoading(false);
      console.log('yyyyyyyyyyyyyyyyyyyyyyyyy');
      return new Promise((resolve, reject) => {
        resolve({ informacao: 3 });
      });
    },
    [],
  );

  function logOut(): void {
    unsubscribeToNotification();
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        logIn: handleLogin,
        logOut,
        loading,
        loadingApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
