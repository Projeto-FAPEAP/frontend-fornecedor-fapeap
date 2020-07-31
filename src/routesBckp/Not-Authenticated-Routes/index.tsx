import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/Not-Authenticated-Screens/Login';
import RecoveryPassword from '../../screens/Not-Authenticated-Screens/RecoveryPassword';
import Register from '../../screens/Not-Authenticated-Screens/Register';
import WarningValidation from '../../screens/Not-Authenticated-Screens/WarningValidation';
import Welcome from '../../screens/Not-Authenticated-Screens/Welcome';

const Stack = createStackNavigator();

const NotAuthenticated: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecoveryPassword"
        component={RecoveryPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="WarningValidation"
        component={WarningValidation}
      />
    </Stack.Navigator>
  );
};

export default NotAuthenticated;
