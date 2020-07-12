import React, { useState, createContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  logIn(): Promise<void>;
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
      if (userLoaded && tokenLoaded) {
        setUser(JSON.parse(userLoaded));
        console.log(JSON.parse(userLoaded), 'joantahn');
      }
    }
    loadData();
  }, []);

  async function logIn(): Promise<void> {
    const response = await axios.get();
    setUser(response.data.fornecedor);
    await AsyncStorage.setItem(
      '@QueroAçaí-Fornecedor:user',
      JSON.stringify(response.data.fornecedor),
    );
    await AsyncStorage.setItem(
      '@QueroAçaí-Fornecedor:user',
      response.tokenFornecedor,
    );
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
