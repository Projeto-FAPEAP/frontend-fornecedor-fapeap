import React, { useContext } from 'react';

import AuthContext from '../contexts/auth';
import BotomTabRoutes from './Authenticated-Routes/BottomTabRoutes';
import NotAuthenticated from './Not-Authenticated-Routes';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <BotomTabRoutes /> : <NotAuthenticated />;
};

export default Routes;
