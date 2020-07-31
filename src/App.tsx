import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import themeLigth from './styles/themes/light';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider theme={themeLigth}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};
/*
reactnavigation
<ThemeProvider theme={themeLigth}>
      <History />
    </ThemeProvider>
<NavigationContainer>
      <AuthProvider>
        <ThemeProvider theme={themeLigth}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer> */
export default App;
