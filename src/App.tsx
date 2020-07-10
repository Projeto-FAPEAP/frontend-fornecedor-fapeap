import React from 'react';

import { ThemeProvider } from 'styled-components';

import Home from './screens/Authenticated-Screens/Home';
import Login from './screens/Not-Authenticated-Screens/Login';
import Register from './screens/Not-Authenticated-Screens/Register';
import Welcome from './screens/Not-Authenticated-Screens/Welcome';
import themeLigth from './styles/themes/light';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themeLigth}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
