import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OrderDetails from '../../../screens/Authenticated-Screens/OrderDetails';
import Settings from '../../../screens/Authenticated-Screens/Settings';
import BottomTabRoutes from '../BottomTabRoutes';

const Stack = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTabRoutes"
        component={BottomTabRoutes}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetails"
        component={OrderDetails}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
