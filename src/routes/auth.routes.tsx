import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SuccessSubmit from '@screens/Not-Authenticated-Screens/Register/SuccessSubmit';

import Login from '../screens/Not-Authenticated-Screens/Login';
import RecoveryPassword from '../screens/Not-Authenticated-Screens/RecoveryPassword';
import Register from '../screens/Not-Authenticated-Screens/Register';
import WarningValidation from '../screens/Not-Authenticated-Screens/WarningValidation';
import Welcome from '../screens/Not-Authenticated-Screens/Welcome';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SuccessSubmit" component={SuccessSubmit} />
      <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
      <Stack.Screen name="WarningValidation" component={WarningValidation} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
