import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {signed ? (
        <Stack.Screen name="App" component={AppRoutes} />
      ) : (
        <Stack.Screen name="Auth" component={AuthRoutes} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
