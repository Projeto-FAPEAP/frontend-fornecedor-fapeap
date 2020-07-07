import React from 'react';

import { ThemeProvider } from 'styled-components';

import Login from './screens/Login';
import RecoveryPassword from './screens/RecoveryPassword';
import Welcome from './screens/Welcome';
import themeLigth from './styles/themes/light';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themeLigth}>
      <RecoveryPassword />
    </ThemeProvider>
  );
};

export default App;
