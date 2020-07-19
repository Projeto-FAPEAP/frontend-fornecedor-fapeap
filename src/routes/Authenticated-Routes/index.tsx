import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import History from '../../screens/Authenticated-Screens/History';
import Home from '../../screens/Authenticated-Screens/Home';
import Settings from '../../screens/Authenticated-Screens/Settings';

const Tab = createBottomTabNavigator();

const Authenticated: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size = 32 }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#84378F' : '#666666'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#84378F' : '#666666' }}>
              Inicio
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={History}
        options={{
          tabBarIcon: ({ focused, size = 32 }) => (
            <Icon
              name="history"
              size={size}
              color={focused ? '#84378F' : '#666666'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#84378F' : '#666666' }}>
              Histórico
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, size = 32 }) => (
            <Icon
              name="user"
              size={size}
              color={focused ? '#84378F' : '#666666'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#84378F' : '#666666' }}>
              Perfil
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Authenticated;
