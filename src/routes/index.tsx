import React from 'react';
import { StatusBar, Image, View, ActivityIndicator } from 'react-native';

import logo from '@assets/logo.png';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { colors } = useTheme();
  const { signed, loadingApp } = useAuth();
  if (loadingApp) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} resizeMode="center" />
        <ActivityIndicator animating={loadingApp} color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent
      />
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
    </>
  );
};

export default Routes;
