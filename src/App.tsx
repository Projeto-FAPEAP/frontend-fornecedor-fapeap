import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import History from './screens/Authenticated-Screens/History';
import Home from './screens/Authenticated-Screens/Home';
import OrderDetails from './screens/Authenticated-Screens/OrderDetails';
import AlmostThere from './screens/Not-Authenticated-Screens/AlmostThere';
import Login from './screens/Not-Authenticated-Screens/Login';
import Register from './screens/Not-Authenticated-Screens/Register';
import Welcome from './screens/Not-Authenticated-Screens/Welcome';
import themeLigth from './styles/themes/light';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themeLigth}>
      <OrderDetails />
    </ThemeProvider>
  );
};
/*  

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
