import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabRoutes from './bottomTab.routes';
import AddProduct from '../screens/Authenticated-Screens/AddProduct';
import EditProduct from '../screens/Authenticated-Screens/EditProduct';
import OrderDetails from '../screens/Authenticated-Screens/OrderDetails';
import Settings from '../screens/Authenticated-Screens/Settings';
import SearchProduct from '../screens/Authenticated-Screens/SearchProduct';
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
        <Stack.Screen
          name="OrderDetails"
          options={{
            headerTitle: 'Detalhes do Pedido',
          }}
          component={OrderDetails}
        />
        <Stack.Screen
          name="AddProduct"
          options={{
            headerTitle: 'Adicionar Produto',
          }}
          component={AddProduct}
        />
        <Stack.Screen
          name="EditProduct"
          options={{
            headerTitle: 'Editar Produto',
          }}
          component={EditProduct}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerTitle: 'Editar Perfil',
          }}
          component={Settings}
        />
        <Stack.Screen
          name="SearchProduct"
          options={{
            headerTitle: 'Buscar Produto',
          }}
          component={SearchProduct}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
