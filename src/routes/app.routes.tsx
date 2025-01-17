import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '@contexts/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import AddProduct from '../screens/Authenticated-Screens/AddProduct';
import EditDelivery from '../screens/Authenticated-Screens/EditDelivery';
import EditProduct from '../screens/Authenticated-Screens/EditProduct';
import EditProfile from '../screens/Authenticated-Screens/EditProfile';
import HistoryDetails from '../screens/Authenticated-Screens/HistoryDetails';
import OrderDetails from '../screens/Authenticated-Screens/OrderDetails';
import SearchProduct from '../screens/Authenticated-Screens/SearchProduct';
import Settings from '../screens/Authenticated-Screens/Settings';
import VisualizeRegister from '../screens/Authenticated-Screens/VisualizeRegister';
import BottomTabRoutes from './bottomTab.routes';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { colors, fonts } = useTheme();
  const { user } = useAuth();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: fonts.Ubuntu.bold,
          },
          cardStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.primary,
            borderBottomWidth: 0,
            borderBottomColor: colors.primary,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            elevation: 3,
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          },
        }}
      >
        <Stack.Screen
          name="Index"
          options={{
            headerTitle: `Olá, ${user?.nome}`,
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
            headerTitle: 'Editar Mídias',
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
        <Stack.Screen
          name="HistoryDetails"
          options={{
            headerTitle: 'Detalhes Histórico',
          }}
          component={HistoryDetails}
        />
        <Stack.Screen
          name="EditProfile"
          options={{
            headerTitle: 'Editar Perfil',
          }}
          component={EditProfile}
        />
        <Stack.Screen
          name="VisualizeRegister"
          options={{
            headerTitle: 'Visualizar Cadastro',
          }}
          component={VisualizeRegister}
        />
        <Stack.Screen
          name="EditDelivery"
          options={{
            headerTitle: 'Editar Entrega de Produtos',
          }}
          component={EditDelivery}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
