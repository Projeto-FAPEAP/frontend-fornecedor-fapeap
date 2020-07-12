import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Authenticated-Screens/Home';
import Settings from '../../screens/Authenticated-Screens/Settings';

const Tab = createBottomTabNavigator();

const Authenticated: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Authenticated;
