import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OrderDetails from '../../../screens/Authenticated-Screens/OrderDetails';

const Stack = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
