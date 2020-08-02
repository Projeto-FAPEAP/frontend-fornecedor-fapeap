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
}

interface Response {
  responseState: boolean;
  responseStatus: string;
}

interface IResponseFornecedor {
  fornecedor: IUser;
  tokenFornecedor: string;
}

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  logIn(cpfCnpj: string, password: string): Promise<void>;
  logOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

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
    }
    loadData();
  }, []);

  const handleLogin = useCallback(
    async (cpfCnpj: string, password: string): Promise<void> => {
      setLoading(true);
      try {
        const response = await api.post<IResponseFornecedor>(
          `/sessao/fornecedor`,
          {
            cpf_cnpj: cpfCnpj,
            senha: password,
          },
        );

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
      } catch (error) {
        const hasResponse = error.response?.data?.error;
        if (hasResponse) {
          Alert.alert('Ocorreu um erro', hasResponse);
        }
      }
      setLoading(false);
    },
    [],
  );

  function logOut(): void {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, logIn: handleLogin, logOut, loading }}
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
