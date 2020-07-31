import React, { useState, createContext, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface Response {
  responseState: boolean;
  responseStatus: string;
}

interface AuthContextData {
  signed: boolean;
  user: any | null;
  loading: boolean;
  logIn(email: string, password: string): Promise<Response>;
  logOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadData(): Promise<void> {
      console.log('passsei qui');
      const userLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Fornecedor:user',
      );
      const tokenLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Fornecedor:token',
      );
      console.log(userLoaded, tokenLoaded);
      if (userLoaded && tokenLoaded) {
        setUser(JSON.parse(userLoaded));
        console.log(JSON.parse(userLoaded), 'joantahn');
      }
    }
    loadData();
  }, []);

  async function logIn(cpfCnpj: string, password: string): Promise<Response> {
    console.log(cpfCnpj, password, 'teste');

    try {
      const response = await api.post(
        `${api.defaults.baseURL}/sessao/fornecedor`,

        {
          cpf_cnpj: cpfCnpj,
          senha: password,
        },
      );
      console.log(response, 'shhhhhhhhhhhhh');

      setUser(response.data.fornecedor);

      await AsyncStorage.setItem(
        '@QueroAçaí-Fornecedor:user',
        JSON.stringify(response.data.fornecedor),
      );
      await AsyncStorage.setItem(
        '@QueroAçaí-Fornecedor:token',
        response.data.tokenFornecedor,
      );
      return new Promise((resolve) => {
        resolve({
          responseState: true,
          responseStatus: '',
        });
      });
    } catch (error) {
      if (error.message === 'Network Error') {
        console.log('auiiiiiiii');
        return new Promise((resolve) => {
          resolve({
            responseState: false,
            responseStatus:
              'Verifique sua conexão de internet e tente novamente!!',
          });
        });
      }
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          responseState: false,
          responseStatus: error.response.data.error,
        });
      });
    }
  }
  function logOut(): void {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, logIn, logOut, loading }}
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
