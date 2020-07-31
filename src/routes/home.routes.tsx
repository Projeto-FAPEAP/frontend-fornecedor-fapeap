import React from 'react';

import LabelProducts from '@components/TopBarLabels/Products';
import LabelRequests from '@components/TopBarLabels/Requests';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';

import Products from '../screens/Authenticated-Screens/Products';
import Requests from '../screens/Authenticated-Screens/Requests';

const TabTop = createMaterialTopTabNavigator();

const HomeRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <TabTop.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.title,
        indicatorStyle: {
          backgroundColor: colors.secundary,
          borderBottomColor: colors.primary,
          borderBottomWidth: 2,
        },
        labelStyle: {
          alignSelf: 'stretch',
        },
      }}
    >
      <TabTop.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarLabel: ({ focused }) => <LabelRequests isFocused={focused} />,
        }}
      />
      <TabTop.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: ({ focused }) => <LabelProducts isFocused={focused} />,
        }}
      />
    </TabTop.Navigator>
  );
};

export default HomeRoutes;
