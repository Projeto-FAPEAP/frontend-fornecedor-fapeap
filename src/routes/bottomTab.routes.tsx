import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import History from '../screens/Authenticated-Screens/History';
import User from '../screens/Authenticated-Screens/User';
import HomeRoutes from './home.routes';

const Tab = createBottomTabNavigator();

const BottomTabRoutes: React.FC = () => {
  const { colors, fonts } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: colors.title,
        activeTintColor: colors.primary,
        labelStyle: {
          fontSize: 12,
          fontFamily: fonts.Ubuntu.normal,
        },
        style: {
          paddingBottom: 5 + getBottomSpace(),
          height: 60 + getBottomSpace(),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="history" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={User}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="user" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabRoutes;
