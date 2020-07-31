import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import BottomTabRoutes from './bottomTab.routes';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { colors, fonts } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: fonts.Ubuntu.bold,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Stack.Screen
          name="Index"
          options={{
            headerTitle: 'Olá, Manoel Gomes',
          }}
          component={BottomTabRoutes}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
