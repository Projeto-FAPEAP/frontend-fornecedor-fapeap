import React, { useState, createContext, useEffect } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import api from '../services/api';

interface Response {
  responseState: boolean;
  responseStatus: string;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  logIn(email: string, password: string): Promise<Response>;
  logOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
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

  async function logIn(email: string, password: string): Promise<Response> {
    console.log(email, password, 'teste');

    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/sessao/fornecedor`,

        {
          cpf_cnpj: email,
          senha: password,
        },
      );
      console.log(response.data);
      setUser(response.data.fornecedor);
      api.defaults.headers.Authorization = `Bearer ${response.data.tokenFornecedor}`;
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
      console.log(error.response.data);
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

export default AuthContext;
